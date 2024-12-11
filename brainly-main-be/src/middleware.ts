import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "./config";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try{
    const token = req.headers["authorization"];

    const decoded = jwt.verify(token as string, JWT_SECRET) as {id: string};
    if(decoded){
        req.userId = decoded.id;
        next()
    }else{
        res.status(403).json({
            message: "You are not logged in"
        });
    }
}catch(e){
    res.json({
        message: "Invalid or Expired Token"
    });
}
}