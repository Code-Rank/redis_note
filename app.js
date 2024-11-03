import express from "express";
import connect from "./db/connect.db.js";
import { redisClient } from "./db/redis.db.js";
import noteRouter from "./routes/note.route.js";
const PORT = 3012;

const app = express();
app.use(express.json());

connect();
app.use("/note", noteRouter);

app.listen(PORT, () => {
  console.log(`Server connected on port ${PORT}`);
});
