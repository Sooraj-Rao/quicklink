import { NextFunction, Request, Response } from "express";
import { ApiModel } from "../models";
import { SendResponse } from "../controller";

interface IDecode {
  apikey: string;
  size: number;
  isSite: boolean;
}

export interface RequestWithData extends Request {
  data?: IDecode;
}

export const ValidateAPI = async (
  req: RequestWithData,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const fullUrl = req.get("Referer") || "No referrer";
  const isSite = fullUrl === process.env.LINK!;

  if (isSite) return next();

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return SendResponse(res, true, "API key is required");
  }
  const apikey = authHeader.split(" ")[1];

  if (apikey === process.env.API_TOKEN) {
    return SendResponse(res, true, "API key is required");
  }

  const isValidApi = await ApiModel.findOne({ apikey });

  if (!isValidApi) {
    return SendResponse(res, true, "Invalid API key");
  }

  const validSize = req.query.size ? Number(req.query.size) : 6;

  req.data = {
    apikey,
    isSite,
    size: validSize,
  };

  next();
};
