import { NextFunction, Request, Response } from "express";
import { updateUrlHistory } from "../controller";
import { ApiModel, IUrl } from "../models";

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
  const queryParams = req.query;
  if (!queryParams?.apikey) {
    return res.json({
      success: false,
      message: "API key is required",
      status: 403,
    });
  }

  const isValidApi = await ApiModel.findOneAndUpdate(
    { apikey: queryParams?.apikey },
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
    return res.json({
      success: false,
      message: "Invalid API key",
      status: 400,
    });
  }
  const validSize = queryParams?.size ? Number(queryParams?.size) : 8;
  req.data = {
    apikey: queryParams?.apikey as string,
    size: validSize,
  };
  next();
};
