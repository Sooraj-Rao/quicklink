import mongoose, { Document, Schema, Model } from "mongoose";

interface IUrlHistory {
  timeStamp: number;
}

interface IUrl extends Document {
  apikey: string;
  history: IUrlHistory[];
  createdAt?: Date;
  updatedAt?: Date;
}

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

export const NormalUrl: Model<IUrl> = mongoose.model<IUrl>(
  "NormalUrl",
  createUrlSchema()
);
