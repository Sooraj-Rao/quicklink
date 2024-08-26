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

const createUrlSchema = (): Schema<IUrl> => {
  return new Schema<IUrl>(
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

export const Links: Model<IUrl> = mongoose.model<IUrl>(
  "links",
  createUrlSchema()
);
