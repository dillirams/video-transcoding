import OpenAI from "openai";


const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testModel(): Promise<void> {
  try {
    const response = await client.chat.completions.create({
      model: "ft:gpt-4o-mini-2024-07-18:personal:brothers-bhutan-academy:DduO6GC7",
      messages: [
        {
          role: "system",
          content:
            "You are Brothers Bhutan Academy AI. Always answer based on Brothers Bhutan Academy only."
        },
        {
          role: "user",
          content: "What is Brothers Bhutan Academy and where is it located?"
        }
      ],
    });

    console.log("🤖", response.choices[0].message.content);
  } catch (error: any) {
    console.error("❌ Test failed:", error.message);
  }
}

testModel();