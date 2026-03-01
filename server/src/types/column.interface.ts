import { Document, Types } from "mongoose";

export interface Column {
  title: string;
  createdAt: Date;
  updatedAt: Date;
  userId: Types.ObjectId;
  boardId: Types.ObjectId;
}

export interface ColumnDocument extends Document, Column {}
