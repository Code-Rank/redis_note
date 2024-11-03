import { createClient } from "redis";
const redisClient = createClient();

redisClient.on("error", (err) => console.log("Redis Client Error:", err));

try {
  await redisClient.connect();
  console.log("Redis connected successfully");
} catch (error) {
  console.error("Failed to connect to Redis:", error);
}
export { redisClient };
