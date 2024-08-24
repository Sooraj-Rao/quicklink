import express from "express";
import {
  AddURL,
  CreateApiKey,
  GetCount,
  GetURL,
  Redirect,
} from "../controller";
import { ValidateAPI } from "../middleware/handleAPI";
export const router = express.Router();

router.post("/add", AddURL);
router.post("/api/", ValidateAPI, AddURL);
router.post("/api/new", CreateApiKey);

router.get("/:short", GetURL);
router.get("/c/:short", GetCount);
router.get("/*", Redirect);
