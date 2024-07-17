import express from "express";
import { AddURL, GetCount, GetURL, Redirect } from "./controller";
export const router = express.Router();

router.post("/add", AddURL);
router.get("/:short", GetURL);
router.get("/c/:short", GetCount);
router.get("/*", Redirect);
