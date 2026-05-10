import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import path from "path";
import fs from "fs";

ffmpeg.setFfmpegPath(ffmpegPath as string);

export async function transcodeToHLS(
  inputPath: string,
  outputDir: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    // Ensure output folders exist
    const resolutions = ["360p", "720p", "1080p"];

    resolutions.forEach((res) => {
      fs.mkdirSync(path.join(outputDir, res), { recursive: true });
    });

    ffmpeg(inputPath)
      .outputOptions([
        "-preset", "veryfast",
        "-g", "48",
        "-sc_threshold", "0",

        // 360p
        "-map", "0:v:0",
        "-map", "0:a:0",
        "-s:v:0", "640x360",
        "-c:v:0", "libx264",
        "-b:v:0", "800k",

        // 720p
        "-map", "0:v:0",
        "-map", "0:a:0",
        "-s:v:1", "1280x720",
        "-c:v:1", "libx264",
        "-b:v:1", "2800k",

        // 1080p
        "-map", "0:v:0",
        "-map", "0:a:0",
        "-s:v:2", "1920x1080",
        "-c:v:2", "libx264",
        "-b:v:2", "5000k",

        "-c:a", "aac",
        "-ar", "48000",
        "-b:a", "128k",

        "-var_stream_map", "v:0,a:0 v:1,a:1 v:2,a:2",

        "-master_pl_name", "master.m3u8",

        "-f", "hls",
        "-hls_time", "6",
        "-hls_playlist_type", "vod",

        "-hls_segment_filename", `${outputDir}/%v/segment_%03d.ts`,
      ])
      .output(`${outputDir}/%v/index.m3u8`)
      .on("start", (commandLine) => {
        console.log("FFmpeg started:", commandLine);
      })
      .on("progress", (progress) => {
        console.log(`Processing: ${progress.percent?.toFixed(2)}%`);
      })
      .on("end", () => {
        console.log("Transcoding finished");
        resolve();
      })
      .on("error", (err) => {
        console.error("FFmpeg error:", err);
        reject(err);
      })
      .run();
  });
}