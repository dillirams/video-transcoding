import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis({
  maxRetriesPerRequest: null,
});

export const videoQueue = new Queue("video-transcoding", {
  connection,
  defaultJobOptions: {
    attempts: 5, // Retry up to 5 times
    backoff: {
      type: "exponential",
      delay: 5000, // Wait 5s, 10s, 20s...
    },
    removeOnComplete: true,
  },
});