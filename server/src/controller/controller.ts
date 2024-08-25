import { Request, Response } from "express";
import { ApiModel, IUrl, NormalUrl } from "../models";
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

    const existingUrl = await NormalUrl.findOne(short ? { short } : { long });

    if (existingUrl) {
      if (short === existingUrl.short) {
        return SendResponse(res, true, "Custom URL is already taken");
      }
      if (existingUrl.short) {
        return SendResponse(res, false, StatusMessages["200"], {
          shortUrl: CompleteURL(existingUrl.short, isSite),
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
    const findUrl = await updateUrlHistory(short);
    if (findUrl) {
      const url = findUrl?.long;
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
    const existingUrlCount = await NormalUrl.findOne({ short });
    if (!existingUrlCount) {
      return SendResponse(res, true, StatusMessages["404"]);
    }

    const url = existingUrlCount;
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
      shortUrl: CompleteURL(short, false),
      lastClicked,
      clicks: url?.history?.length,
      timestamp: fetchNormalTime,
    });
  } catch (error) {
    console.log(error);
    return SendResponse(res, true, StatusMessages["500"]);
  }
};

export const updateUrlHistory = async (
  short?: string
): Promise<IUrl | null> => {
  return await NormalUrl.findOneAndUpdate(
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
    const newKey = await ApiModel.create({ apikey: RandomGenerator(24) });
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
  isSite ? link : `${ServerURL}/${link}`;
