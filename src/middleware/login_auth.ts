import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

const secretKey: string = process.env.ACCESS_TOKEN_SECRET as string;

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(401);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
}



