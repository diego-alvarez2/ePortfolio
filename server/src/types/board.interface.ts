import { Document, Types, } from "mongoose";

export interface Board {
  title: string;
  createdAt: Date;
  updatedAt: Date;
  userId: Types.ObjectId;
}

export interface BoardDocument extends Document, Board {}