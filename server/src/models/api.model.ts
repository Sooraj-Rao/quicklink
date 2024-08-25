import mongoose, { Document, Schema, Model } from "mongoose";
import { IUrl } from "./link.model";

const createUrlSchema = (): Schema => {
  return new Schema(
    {
      apikey: { type: String, required: true },
      history: [
        {
          timeStamp: { type: Number, required: true },
        },
      ],
    },
    { timestamps: true }
  );
};

export const ApiModel: Model<IUrl> = mongoose.model<IUrl>("api", createUrlSchema());
