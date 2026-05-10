import fs from "fs";
import path from "path";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/s3";
import { Readable } from "stream";

const BUCKET_NAME = process.env.S3_BUCKET_NAME || "dilli-media-storage";
const REGION = process.env.S3_REGION || "eu-north-1";

// DOWNLOAD FROM S3
export async function downloadFromS3(
  fileUrl: string,
  outputPath: string
): Promise<void> {
  const url = new URL(fileUrl);
  const s3Key = decodeURIComponent(url.pathname.substring(1));

  let attempts = 0;
  const maxAttempts = 5;

  while (attempts < maxAttempts) {
    try {
      console.log(
        `Downloading from S3 (Attempt ${attempts + 1}) - Bucket: ${BUCKET_NAME}, Key: ${s3Key}`
      );
      const response = await s3.send(
        new GetObjectCommand({
          Bucket: BUCKET_NAME,
          Key: s3Key,
        })
      );

      const body = response.Body as Readable;

      if (!body) {
        throw new Error("Empty response body from S3");
      }

      await new Promise<void>((resolve, reject) => {
        const writer = fs.createWriteStream(outputPath);
        body.pipe(writer);
        writer.on("finish", () => resolve());
        writer.on("error", (err) => reject(err));
      });

      return; // Success!
    } catch (error: any) {
      if (
        (error.name === "NoSuchKey" || error.Code === "NoSuchKey") &&
        attempts < maxAttempts - 1
      ) {
        console.warn(`Key ${s3Key} not found yet, retrying in 5s...`);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        attempts++;
      } else {
        throw error;
      }
    }
  }
}

// UPLOAD SINGLE FILE
async function uploadFileToS3(
  localFilePath: string,
  s3Key: string
): Promise<string> {
  const fileBuffer = fs.readFileSync(localFilePath);

  let contentType = "application/octet-stream";

  if (localFilePath.endsWith(".m3u8")) {
    contentType = "application/vnd.apple.mpegurl";
  } else if (localFilePath.endsWith(".ts")) {
    contentType = "video/mp2t";
  }

  console.log(`Uploading to S3: ${s3Key} (${fileBuffer.length} bytes)`);

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: s3Key,
      Body: fileBuffer,
      ContentType: contentType,
    })
  );

  return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${s3Key}`;
}

// UPLOAD DIRECTORY
export async function uploadDirectoryToS3(
  localDirPath: string,
  s3Folder: string
): Promise<string> {
  const files = getAllFiles(localDirPath);

  for (const file of files) {
    const relativePath = path.relative(localDirPath, file);
    const s3Key = `${s3Folder}/${relativePath.replace(/\\/g, "/")}`;

    await uploadFileToS3(file, s3Key);
  }

  return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${s3Folder}/master.m3u8`;
}

// RECURSIVE FILE GETTER
function getAllFiles(dirPath: string): string[] {
  let results: string[] = [];

  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  }

  return results;
}