import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Connect } from "./src/db";
import { router } from "./src/router";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

(async () => {
  try {
    await Connect();
  } catch (error) {
    process.exit(1);
  }
})();

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
