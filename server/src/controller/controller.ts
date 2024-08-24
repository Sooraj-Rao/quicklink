import { Request, Response } from "express";
import { Model } from "mongoose";
import { ApiModel, CustomUrl, IUrl, NormalUrl } from "../models";
import { RandomGenerator, StatusMessages, Validator } from "../utils/helper";
import { RequestWithData } from "../middleware";

const Link = process.env.LINK!;

export const AddURL = async (req: RequestWithData, res: Response) => {
  try {
    const { long, custom: short, key } = req.body;
    const queryParams = req.data;
    const isAdmin =
      key && process.env.OWNER ? key === process.env.OWNER : false;

    if (!isAdmin) {
      const { error, message } = Validator({ long, short });
      if (error) {
        return SendResponse(res, false, 400, message || "Invalid URL");
      }
    }

    let normalUrlExists;
    let customUrlExists;

    if (long && short) {
      [normalUrlExists, customUrlExists] = await Promise.all([
        NormalUrl.findOne({ long }),
        CustomUrl.findOne({ short }),
      ]);
    } else {
      normalUrlExists = await NormalUrl.findOne({ long });
    }

    if (normalUrlExists && !short) {
      return SendResponse(res, true, 200, StatusMessages["200"], {
        short: normalUrlExists?.short,
      });
    }

    if (customUrlExists) {
      return SendResponse(res, false, 400, "Custom URL is already taken");
    }

    let shortUrl = RandomGenerator(Number(queryParams?.size), isAdmin);
    if (short) {
      const newUrl = new CustomUrl({ short, long });
      await newUrl.save();
      return SendResponse(res, true, 200, "Custom URL created", { short });
    } else {
      const newUrl = new NormalUrl({ short: shortUrl, long });
      await newUrl.save();
      return SendResponse(res, true, 200, "Short URL created", {
        short: shortUrl,
      });
    }
  } catch (error) {
    console.log(error);
    return SendResponse(res, false, 500, StatusMessages["500"]);
  }
};

export const GetURL = async (req: Request, res: Response) => {
  try {
    const { short } = req.params;
    const [findUrl, findUrlCustom] = await Promise.all([
      updateUrlHistory(NormalUrl, short),
      updateUrlHistory(CustomUrl, short),
    ]);
    if (findUrl || findUrlCustom) {
      const url = findUrl ? findUrl?.long : findUrlCustom?.long;
      if (url) {
        const redirectUrl = url.startsWith("http") ? url : `http://${url}`;
        return res.redirect(redirectUrl);
      }
    }
    return SendResponse(res, false, 404, StatusMessages["404"]);
  } catch (error) {
    console.error("Error in GetURL:", error);
    return SendResponse(res, false, 500, StatusMessages["500"]);
  }
};

export const GetCount = async (req: Request, res: Response) => {
  try {
    const { short } = req.params;
    const [normalUrlCount, CustomUrlCount] = await Promise.all([
      NormalUrl.findOne({ short }),
      CustomUrl.findOne({ short }),
    ]);

    if (normalUrlCount || CustomUrlCount) {
      const url = normalUrlCount ? normalUrlCount : CustomUrlCount;
      if (url) {
        return SendResponse(res, true, 200, "URL count retrieved", {
          count: url?.history?.length,
        });
      }
    }
    return SendResponse(res, false, 404, StatusMessages["404"]);
  } catch (error) {
    console.log(error);
    return SendResponse(res, false, 500, StatusMessages["500"]);
  }
};

export const updateUrlHistory = async (
  Model: Model<IUrl>,
  short?: string
): Promise<IUrl | null> => {
  return await Model.findOneAndUpdate(
    { short },
    {
      $push: {
        history: {
          timeStamp: Date.now(),
        },
      },
    },
    { new: true }
  );
};

export const CreateApiKey = async (_: Request, res: Response) => {
  try {
    const newKey = await ApiModel.create({ apikey: RandomGenerator(32) });
    if (!newKey) {
      return SendResponse(res, false, 500, StatusMessages["500"]);
    }
    return SendResponse(res, true, 200, "API key created", {
      apikey: newKey.apikey,
    });
  } catch (error) {
    return SendResponse(res, false, 500, StatusMessages["500"]);
  }
};

export const Redirect = (_: Request, res: Response): void => {
  return res.redirect(Link);
};

export const SendResponse = (
  res: Response,
  success: boolean,
  status: number,
  message?: string,
  data?: { short?: string; count?: number; apikey?: string }
) => {
  return res.json({ success, status, message, data });
};
