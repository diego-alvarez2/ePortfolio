import { Request, Response, NextFunction  } from "express";
import UserModel from '../models/user'

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = new UserModel({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        });
        console.log()
    } catch (err) {
        next(err);
    }
};