import { prisma } from "../../lib/prisma";

async function test() {
  console.log("Testing connection with native prisma client...");
  try {
    const lecture = await prisma.lecture.findFirst();
    console.log("Query successful! Data found:", lecture ? lecture.id : "None");
  } catch (e) {
    console.error("Query failed with error:", e);
  } finally {
    await prisma.$disconnect();
  }
}

test();
