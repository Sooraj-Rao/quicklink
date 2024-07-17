import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
let DB_URL = process.env.MONGO_URI!;
export const Connect = () => {
  mongoose
    .connect(DB_URL)
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log("DB Connection Failed", err));
};

