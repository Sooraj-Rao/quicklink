import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Connect } from "./src/utils/db/connect";
import { router } from "./src/routes";
import { limiter } from "./src/utils/helper/rate-limit";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(limiter)
app.use(express.json());
app.set("trust proxy", 1); 


(async () => {
  try {
    Connect();
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
})();

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
