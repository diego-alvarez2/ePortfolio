import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken'
import { secret } from "../config";
import userModel from "../models/userModel";
import { ExpressRequestInterface } from "../types/expressRequest.interface";

export default async (req: ExpressRequestInterface, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
           return res.sendStatus(401);
        }
        const token = authHeader.split(' ')[1];
        const data = jwt.verify(token, secret) as {id: string; email: string};
        const user = await userModel.findById(data.id);

        if (!user) {
            return res.sendStatus(401);
        }
        req.user = user; // Here we make sure that our request is not coming from express
        next();
    } catch {
        res.sendStatus(401);
    }
};