import path from "path";
import dotenv from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { PrismaClient } from "../generated/prisma/client";

// Find .env in the backend root regardless of where the script is run
const envPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: envPath });

// Fallback: search relative to this file if process.cwd() didn't work (e.g. running from subfolders)
if (!process.env.DATABASE_URL) {
  dotenv.config({ path: path.resolve(import.meta.dir, "../.env") });
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in .env file. Please check your configuration.");
}

console.log("Connecting to database at:", connectionString.replace(/:[^:@]+@/, ":****@"));

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export { prisma };