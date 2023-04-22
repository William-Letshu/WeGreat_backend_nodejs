import { Request } from "express";
import { User } from "../models/User";
import { Merchant } from "../models/Merchant";

export interface AuthenticatedUserRequest extends Request {
  user: User;
}

export interface AuthenticatedMerchantRequest extends Request {
  merchant: Merchant;
}
