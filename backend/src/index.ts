import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { connectMongo } from "./db";
import { client } from "./routes/client";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/client", client);

const PORT = Number(process.env.PORT || 3001);
const MONGO_URI = process.env.MONGO_URI as string;

async function main() {
  await connectMongo(MONGO_URI);
  app.listen(PORT, () =>
    console.log(`[api] listening on http://localhost:${PORT}`),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
