import { Request, Response } from "express";

import { Document, Model } from "mongoose";
import { CustomUrl, NormalUrl } from "../models";
import { RandomGenerator, Validator } from "../utils/helper";

const Link = process.env.LINK!;

interface UrlDocument extends Document {
  short: string;
  long: string;
  history: { timeStamp: number }[];
}

export const AddURL = async (req: Request, res: Response): Promise<void> => {
  try {
    const { long, custom: short, key } = req.body;
    if (key !== process.env.OWNER) {
      const { error, message } = Validator({ long, short });
      if (error) {
        console.log(message);
        res.json({ message, success: false });
        return;
      }
    }

    const [normalUrlExists, customUrlExists] = await Promise.all([
      NormalUrl.findOne({ long }),
      CustomUrl.findOne({ short }),
    ]);

    if (normalUrlExists && !short) {
      res.json({ short: normalUrlExists.short, success: true });
      return;
    }

    if (customUrlExists) {
      res.json({ message: "Custom URL is already taken", success: false });
      return;
    }

    let shortUrl = RandomGenerator();
    if (short) {
      const newUrl = new CustomUrl({ short, long });
      await newUrl.save();
      res.json({ short, success: true });
    } else {
      const newUrl = new NormalUrl({ short: shortUrl, long });
      await newUrl.save();
      res.json({ short: shortUrl, success: true });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Failed to create Short URL", success: false });
  }
};

export const GetURL = async (req: Request, res: Response): Promise<void> => {
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
    res.redirect(`${Link}`);
  } catch (error) {
    console.error("Error in GetURL:", error);
    res.redirect(`${Link}`);
  }
};

export const GetCount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { short } = req.params;
    const [normalUrlCount, CustomUrlCount] = await Promise.all([
      NormalUrl.findOne({ short }),
      CustomUrl.findOne({ short }),
    ]);

    if (normalUrlCount || CustomUrlCount) {
      const url = normalUrlCount ? normalUrlCount : CustomUrlCount;
      if (url) {
        res.json({ count: url.history.length, data: url });
      }
    }
    res.json({ message: "This URL doesn't exist" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Failed to fetch data bro!!" });
  }
};

const updateUrlHistory = async (
  Model: Model<UrlDocument>,
  short: string
): Promise<UrlDocument | null> => {
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

export const Redirect = (_: Request, res: Response): void => {
  res.redirect(Link);
};
