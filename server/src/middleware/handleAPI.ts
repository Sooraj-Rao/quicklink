import { NextFunction, Request, Response } from "express";
import { ApiModel } from "../models";
import { SendResponse } from "../controller";

interface IDecode {
  apikey: string;
  size: number;
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
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return SendResponse(res, true, "API key is required");
  }

  const apikey = authHeader.split(" ")[1];

  const isValidApi = await ApiModel.findOneAndUpdate(
    { apikey },
    {
      $push: {
        history: {
          timeStamp: Date.now(),
        },
      },
    },
    { new: true }
  );

  if (!isValidApi) {
    return SendResponse(res, true, "Invalid API key");
  }

  const validSize = req.query.size ? Number(req.query.size) : 8;

  req.data = {
    apikey,
    size: validSize,
  };

  next();
};
