import express from "express";
import {
  AddURL,
  CreateApiKey,
  GetAll,
  GetAllApiUrl,
  GetCount,
  GetURL,
  Redirect,
} from "../controller";
import { ValidateAPI } from "../middleware/handleAPI";
export const router = express.Router();

router.post("/api/new", CreateApiKey);
router.post("/api/", ValidateAPI, AddURL);

router.get("/api/count/:short", GetCount);
router.get("/api/getall", ValidateAPI, GetAllApiUrl);

router.get("/:short", GetURL);
router.get("/api/all", GetAll);
router.get("/*", Redirect);
