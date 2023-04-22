import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getUserByEmail, getMerchantByEmail } from "../database";
import { User } from "../models/User";
import { Merchant } from "../models/Merchant";
require("dotenv").config();

interface TokenPayload {
  id: number;
  email: string;
  role: string;
}
const JWT_SECRET: string = process.env.JWT_SECRET!;

export async function authenticateUser(
  req: Request & { user?: User },
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(
      token,
      JWT_SECRET
    ) as unknown as TokenPayload;
    const user = await getUserByEmail(decodedToken.email);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

interface AuthenticatedMerchantRequest extends Request {
  merchant?: Merchant;
}

export async function authenticateMerchant(
  req: AuthenticatedMerchantRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(
      token,
      JWT_SECRET
    ) as unknown as TokenPayload;
    const merchant = await getMerchantByEmail(decodedToken.email);
    if (!merchant) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.merchant = merchant;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export interface AuthenticatedUserRequest extends Request {
  user?: User;
}
