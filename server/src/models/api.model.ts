import mongoose, { Document, Schema, Model } from "mongoose";
import { IUrl } from "./link.model";

export interface IAPI extends Document {
  apikey: string;
  links: IUrl[]; 
}

const createUrlSchema = (): Schema<IAPI> => {
  return new Schema<IAPI>(
    {
      apikey: { type: String, required: true },
      links: [{ type: Schema.Types.ObjectId, ref: "links" }],
    },
    { timestamps: true }
  );
};

export const ApiModel: Model<IAPI> = mongoose.model<IAPI>(
  "api",
  createUrlSchema()
);
