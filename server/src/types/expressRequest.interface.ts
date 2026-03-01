import { Request } from "express";
import { UserDocument } from "./user.interface";

export interface ExpressRequestInterface<P = any> extends Request<P> {
    user?: UserDocument;
}