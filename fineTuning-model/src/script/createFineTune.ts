// STEP 2: createFineTune.ts
import OpenAI from "openai";


const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function createFineTune(): Promise<void> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is missing in .env");
    }

   
    const TRAINING_FILE_ID: string = process.env.FILE_ID as string;

    const job = await client.fineTuning.jobs.create({
      training_file: TRAINING_FILE_ID,
      model: "gpt-4o-mini-2024-07-18",
      hyperparameters: {
        n_epochs: 3,
      },
      suffix: "brothers-bhutan-academy",
    });

    console.log("✅ Fine-tune job created");
    console.log("🧠 Job ID:", job.id);
    console.log("📊 Status:", job.status);
    console.log("🤖 Base Model:", job.model);
  } catch (error: any) {
    console.error("❌ Fine-tune creation failed:", error.message);
  }
}

createFineTune();