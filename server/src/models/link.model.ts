import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUrlHistory {
  timeStamp: number;
}

export interface IUrl extends Document {
  short?: string;
  long?: string;
  apikey?: string;
  history?: IUrlHistory[];
  createdAt?: Date;
  updatedAt?: Date;
}

const createUrlSchema = (): Schema => {
  return new Schema(
    {
      short: { type: String, required: true },
      long: { type: String, required: true },
      history: [
        {
          timeStamp: { type: Number, required: true },
        },
      ],
    },
    { timestamps: true }
  );
};

export const NormalUrl: Model<IUrl> = mongoose.model<IUrl>(
  "NormalUrl",
  createUrlSchema()
);

export const CustomUrl: Model<IUrl> = mongoose.model<IUrl>(
  "CustomUrl",
  createUrlSchema()
);
