
import express, { type Request, type Response }  from "express";
import OpenAI from "openai";
import cors from 'cors'



const app = express();
app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 8000;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Your fine-tuned model ID
const MODEL_ID =
  "ft:gpt-4o-mini-2024-07-18:personal:brothers-bhutan-academy:DduO6GC7";

// Health check
app.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Brothers Bhutan Academy AI API is running",
  });
});


app.post("/chat", async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        success: false,
        error: "Message is required and must be a string",
      });
    }

    const response = await client.chat.completions.create({
      model: MODEL_ID,
      messages: [
        {
          role: "system",
          content:
            "You are Brothers Bhutan Academy AI assistant. Help users with courses, tutors, students, lectures, transcoding, analytics, and platform guidance.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
    });

    const answer = response.choices[0].message.content;

    return res.status(200).json({
      success: true,
      userMessage: message,
      response: answer,
    });
  } catch (error: any) {
    console.error(" API Error:", error.message);

    return res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});