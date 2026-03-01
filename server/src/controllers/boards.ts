import { Request, Response, NextFunction } from "express";
import BoardModel from "../models/boardModel";
import { ExpressRequestInterface } from "../types/expressRequest.interface";
import { Types } from "mongoose";
import { Server } from "socket.io";
import { Socket } from "../types/socket.interface";

export const getBoards = async (
  req: ExpressRequestInterface,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const boards = await BoardModel.find({ userId: new Types.ObjectId(req.user._id) });
    res.send(boards);
  } catch (err) {
    next(err);
  }
};

export const getBoard = async (
  req: ExpressRequestInterface,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const board = await BoardModel.findById(req.params.boardId);
    res.send(board);
  } catch (err) {
    next(err);
  }
};

export const createBoards = async (
    req: ExpressRequestInterface,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) {
        return res.sendStatus(401);
      }
      const newBoard = new BoardModel({
        title: req.body.title,
        userId: new Types.ObjectId(req.user._id),
      });
      const savedBoard = await newBoard.save();
      res.send(savedBoard);
    } catch (err) {
      next(err);
    }
  };

  export const joinBoard = (
    io: Server,
    socket: Socket,
    data: { boardId: string }
  ) => {
    console.log("server socket io join", socket.user);
    socket.join(data.boardId);
  };
  
  export const leaveBoard = (
    io: Server,
    socket: Socket,
    data: { boardId: string }
  ) => {
    console.log("server socket io leave", data.boardId);
    socket.leave(data.boardId);
  };
