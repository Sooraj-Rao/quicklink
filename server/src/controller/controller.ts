import { Request, Response } from "express";
import { Model } from "mongoose";
import { ApiModel, CustomUrl, IUrl, IUrlHistory, NormalUrl } from "../models";
import {
  RandomGenerator,
  ServerURL,
  StatusMessages,
  Validator,
} from "../utils/helper";
import { RequestWithData } from "../middleware";

const Link = process.env.LINK!;

export const AddURL = async (req: RequestWithData, res: Response) => {
  try {
    const { long, custom: short, key } = req.body;
    const queryParams = req.data;
    const fullUrl = req.get("Referer") || "No referrer";
    const isSite = fullUrl === process.env.LINK!;
    const isAdmin = key === process.env.OWNER!;
    if (!isAdmin) {
      const { error, message } = Validator({ long, short });
      if (error) {
        return SendResponse(res, true, message || "Invalid URL");
      }
    }

    const normalUrlExists = await NormalUrl.findOne(
      short ? { short } : { long }
    );

    if (normalUrlExists) {
      if (short === normalUrlExists.short) {
        return SendResponse(res, true, "Custom URL is already taken");
      }
      if (normalUrlExists.short) {
        return SendResponse(res, false, StatusMessages["200"], {
          shortUrl: CompleteURL(normalUrlExists.short, isSite),
        });
      }
    }

    let shortUrl = RandomGenerator(Number(queryParams?.size), isAdmin);

    const newUrL = await NormalUrl.create({
      short: short ? short : shortUrl,
      long,
    });

    return SendResponse(res, false, StatusMessages["200"], {
      shortUrl: newUrL?.short,
    });
  } catch (error) {
    console.log(error);
    return SendResponse(res, true, StatusMessages["500"]);
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
    return SendResponse(res, true, StatusMessages["404"]);
  } catch (error) {
    console.error("Error in GetURL:", error);
    return SendResponse(res, true, StatusMessages["500"]);
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

      const fetchNormalTime =
        url?.history?.map((item, i) => {
          const date = new Date(item?.timeStamp);
          return date.toLocaleString();
        }) || [];
      const lastClicked =
        fetchNormalTime?.length == 0
          ? "No clicks yet"
          : fetchNormalTime[fetchNormalTime?.length - 1];

      if (!url) {
        return SendResponse(res, true, StatusMessages["404"]);
      }

      SendResponse(res, false, "Click count retrieved", {
        shortUrl: ServerURL + "/" + short,
        lastClicked,
        clicks: url?.history?.length,
        timestamp: fetchNormalTime,
      });
    }
  } catch (error) {
    console.log(error);
    return SendResponse(res, true, StatusMessages["500"]);
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
      return SendResponse(res, true, StatusMessages["500"]);
    }
    return SendResponse(res, false, "API key created", {
      apikey: newKey.apikey,
    });
  } catch (error) {
    return SendResponse(res, true, StatusMessages["500"]);
  }
};

export const Redirect = (_: Request, res: Response): void => {
  return res.redirect(Link);
};

export const SendResponse = (
  res: Response,
  error: boolean,
  message?: string,
  data?: any
) => {
  return res.json({ error, message, data });
};

export const CompleteURL = (link: string, isSite: boolean) =>
  isSite ? link : `https://sj1.xyz/${link}`;
