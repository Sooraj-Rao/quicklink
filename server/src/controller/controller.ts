import { Request, Response } from "express";
import { ApiModel, IUrl, Links } from "../models";
import {
  RandomGenerator,
  ServerURL,
  StatusMessages,
  Validator,
} from "../utils/helper";
import { RequestWithData } from "../middleware";
import NodeCache from "node-cache";
import path from "path";

const urlCache = new NodeCache({ stdTTL: 300 });


export const AddURL = async (req: RequestWithData, res: Response) => {
  try {
    const { long, custom: short, key } = req.body;
    const queryParams = req.data;
    const isSite = queryParams?.isSite as boolean;
    const isAdmin = key === process.env.OWNER!;

    if (!isAdmin) {
      const { error, message } = Validator({ long, short });
      if (error) {
        return SendResponse(res, true, message || "Invalid URL");
      }
    }

    const existingUrl = await Links.findOne(short ? { short } : { long });

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

    const newUrL = await Links.create({
      short: short ? short : shortUrl,
      long,
    });

    await ApiModel.findOneAndUpdate(
      { apikey: queryParams?.apikey },
      {
        $push: {
          links: newUrL._id,
        },
      }
    );

    return SendResponse(res, false, StatusMessages["200"], {
      shortUrl: queryParams?.apikey
        ? CompleteURL(newUrL.short as string, isSite)
        : newUrL?.short,
    });
  } catch (error) {
    return SendResponse(res, true, StatusMessages["500"]);
  }
};

export const GetURL = async (req: Request, res: Response) => {
  try {
    const { short } = req.params;
    const cachedUrl = urlCache.get(short) as string | undefined;
    if (cachedUrl) {
      console.log("Cache hit for:", short);
      const redirectUrl = cachedUrl.startsWith("http")
        ? cachedUrl
        : `http://${cachedUrl}`;
      return res.redirect(redirectUrl);
    }
    const findUrl = await updateUrlHistory(short);
    if (findUrl) {
      const url = findUrl?.long;
      if (url) {
        urlCache.set(short, url);

        const redirectUrl = url.startsWith("http") ? url : `https://${url}`;
        return res.redirect(redirectUrl);
      }
    }
    return RedirectNotFound(req, res);
  } catch (error) {
    console.error("Error in GetURL:", error);
    return SendResponse(res, true, StatusMessages["500"]);
  }
};

export const GetCount = async (req: Request, res: Response) => {
  try {
    const { short } = req.params;
    const existingUrlCount = await Links.findOne({ short });
    if (!existingUrlCount) {
      return RedirectNotFound(req, res);
    }

    const url = existingUrlCount;
    const fetchNormalTime =
      url?.history?.map((item, i) => {
        const date = new Date(item?.timeStamp);
        return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
      }) || [];

    const lastClicked =
      fetchNormalTime?.length == 0
        ? "No clicks yet"
        : fetchNormalTime[fetchNormalTime?.length - 1];

    if (!url) {
      return RedirectNotFound(req, res);
    }

    SendResponse(
      res,
      false,
      "Click count retrieved",

      {
        timeZone: "Asia/Kolkata",
        shortUrl: CompleteURL(short, false),
        lastClicked,
        clicks: url?.history?.length,
        timestamp: fetchNormalTime,
      }
    );
  } catch (error) {
    console.log(error);
    return SendResponse(res, true, StatusMessages["500"]);
  }
};

export const GetAll = async (req: Request, res: Response) => {
  const { ref, count } = req.query;
  if (ref === "srao") {
    let data;

    if (count) {
      data = await Links.find().limit(Number(count)).sort({ _id: -1 });
    } else {
      data = await Links.find().sort({ _id: -1 });
    }

    res.json(data);
  } else {
    res.json({ message: "Failed", data: { ref, count } });
  }
};

export const GetAllApiUrl = async (req: RequestWithData, res: Response) => {
  try {
    const reqData = req.data;
    const result = await ApiModel.findOne({ apikey: reqData?.apikey }).populate(
      "links"
    );

    const OnlyLinkData = result?.links.map((item, i) => {
      const times =
        item?.history?.map((item, i) => {
          const date = new Date(item?.timeStamp);
          return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        }) || [];

      return {
        shortUrl: CompleteURL(item.short as string, false),
        longUrl: item.long,
        clickHistory: item.history?.length == 0 ? "No clicks yet" : times,
      };
    });
    return SendResponse(res, false, "Successfully fetched data", OnlyLinkData);
  } catch (error) {
    return SendResponse(res, true, StatusMessages["500"]);
  }
};

export const updateUrlHistory = async (
  short?: string
): Promise<IUrl | null> => {
  return await Links.findOneAndUpdate(
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
    const newApiKey = RandomGenerator(24);
    const newKey = await ApiModel.create({ apikey: `quklnk_${newApiKey}` });
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

export const RedirectNotFound = (_: Request, res: Response) => {
  return res
    .status(404)
    .sendFile(path.join(__dirname, "../html/404-page.html"));
};
export const RedirectToApp = (_: Request, res: Response) => {
  return res.redirect(process.env.LINK!);
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
