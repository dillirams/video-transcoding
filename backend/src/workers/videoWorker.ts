// src/workers/videoWorker.ts

import { Worker, Job } from "bullmq";
import IORedis from "ioredis";
import fs from "fs";
import path from "path";

import { prisma } from "../../lib/prisma";
import { downloadFromS3, uploadDirectoryToS3 } from "../utils/s3";
import { transcodeToHLS } from "../utils/ffmpeg";

// -----------------------------
// REDIS CONNECTION
// -----------------------------
const connection = new IORedis(process.env.REDIS_URL || "redis://127.0.0.1:6379", {
  maxRetriesPerRequest: null,
});

// -----------------------------
// JOB DATA TYPE
// -----------------------------
interface VideoJobData {
  lectureId: string;
}

// -----------------------------
// WORKER
// -----------------------------
const worker = new Worker<VideoJobData>(
  "video-transcoding",
  async (job: Job<VideoJobData>) => {
    const { lectureId } = job.data;

    console.log("the lecture is", lectureId);

    // Local temp paths
    const tempRoot = path.join(process.cwd(), "tmp");
    const inputPath = path.join(tempRoot, `${lectureId}.mp4`);
    const outputDir = path.join(tempRoot, lectureId);

    try {
      console.log(`Starting transcoding for lecture: ${lectureId}`);

      // -----------------------------
      // 1. GET LECTURE FROM DB
      // -----------------------------
      const lecture = await prisma.lecture.findFirst({
        where: { id: lectureId },
      });

     

      if (!lecture) {
        throw new Error(`Lecture not found: ${lectureId}`);
      }

      if (!lecture.orginalVideoUrl) {
        throw new Error(`Lecture has no originalVideoUrl: ${lectureId}`);
      }

      // -----------------------------
      // 2. UPDATE STATUS → PROCESSING
      // -----------------------------
      await prisma.lecture.update({
        where: { id: lectureId },
        data: {
          status: "PROCESSING",
        },
      });

      // -----------------------------
      // 3. CREATE TEMP DIRECTORIES
      // -----------------------------
      fs.mkdirSync(tempRoot, { recursive: true });
      fs.mkdirSync(outputDir, { recursive: true });

      // -----------------------------
      // 4. DOWNLOAD RAW VIDEO FROM S3
      // -----------------------------
      console.log(`Downloading raw video for lecture: ${lectureId}`);
      await downloadFromS3(lecture.orginalVideoUrl, inputPath);

      if (!fs.existsSync(inputPath)) {
        throw new Error("Raw video download failed");
      }

      // -----------------------------
      // 5. TRANSCODE VIDEO
      // -----------------------------
      console.log(`Transcoding lecture: ${lectureId}`);
      await transcodeToHLS(inputPath, outputDir);

      // -----------------------------
      // 6. VALIDATE OUTPUT
      // -----------------------------
      const masterPlaylistPath = path.join(outputDir, "master.m3u8");

      if (!fs.existsSync(masterPlaylistPath)) {
        throw new Error("master.m3u8 not generated");
      }

      // -----------------------------
      // 7. UPLOAD HLS OUTPUT TO S3
      // -----------------------------
      console.log(`Uploading transcoded output for lecture: ${lectureId}`);

      const masterPlayListUrl = await uploadDirectoryToS3(
        outputDir,
        `processed/${lectureId}`
      );

      // -----------------------------
      // 8. UPDATE DATABASE
      // -----------------------------
      await prisma.lecture.update({
        where: { id: lectureId },
        data: {
          masterPlayListUrl,
          status: "READY",
        },
      });

      console.log(`Lecture ${lectureId} transcoded successfully`);

      return {
        success: true,
        lectureId,
        masterPlayListUrl,
      };
    } catch (error) {
      console.error(`Lecture ${lectureId} failed`, error);

      // -----------------------------
      // UPDATE STATUS → FAILED
      // -----------------------------
      try {
        await prisma.lecture.update({
          where: { id: lectureId },
          data: {
            status: "FAILED",
          },
        });
      } catch (dbError) {
        console.error("Failed to update lecture status to FAILED", dbError);
      }

      throw error;
    } finally {
      // -----------------------------
      // CLEANUP TEMP FILES
      // -----------------------------
      try {
        if (fs.existsSync(inputPath)) {
          fs.unlinkSync(inputPath);
        }

        if (fs.existsSync(outputDir)) {
          fs.rmSync(outputDir, {
            recursive: true,
            force: true,
          });
        }

        console.log(`Cleaned temp files for lecture: ${lectureId}`);
      } catch (cleanupError) {
        console.error(
          `Failed cleaning temp files for lecture: ${lectureId}`,
          cleanupError
        );
      }
    }
  },
  {
    connection,
    concurrency: 2, // Can process 2 videos simultaneously
  }
);

// -----------------------------
// EVENTS
// -----------------------------
worker.on("completed", (job) => {
  console.log(`Job completed: ${job.id}`);
});

worker.on("failed", (job, err) => {
  console.error(`Job failed: ${job?.id}`, err);
});

worker.on("error", (err) => {
  console.error("Worker error:", err);
});

// -----------------------------
// GRACEFUL SHUTDOWN
// -----------------------------
process.on("SIGINT", async () => {
  console.log("Shutting down worker...");
  await worker.close();
  await connection.quit();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Shutting down worker...");
  await worker.close();
  await connection.quit();
  process.exit(0);
});

console.log("Video transcoding worker is running...");