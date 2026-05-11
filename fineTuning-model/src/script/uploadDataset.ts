// STEP 1: uploadDataset.ts
import OpenAI from "openai";
import fs from "fs";




const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function uploadDataset(): Promise<void> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is missing in .env");
    }

    const file = await client.files.create({
      file: fs.createReadStream("./src/data/train.jsonl"),
      purpose: "fine-tune",
    });

    console.log("Uploaded successfully");
    console.log(" File ID:", file.id);
    console.log(" Filename:", file.filename);
    console.log(" Purpose:", file.purpose);
  } catch (error: any) {
    console.error("Upload failed:", error.message);
  }
}

uploadDataset();