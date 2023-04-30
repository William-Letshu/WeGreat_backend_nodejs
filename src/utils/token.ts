import * as jwt from 'jsonwebtoken';

require("dotenv").config();
const secretKey: string = process.env.ENCRYPTION_SECRET_KEY as string;

export function createToken(payload: object, expiresIn: string | number): string {
    return jwt.sign(payload, secretKey, { expiresIn });
  }

export function verifyToken(token: string): object | undefined {
    try {
      return jwt.verify(token, secretKey) as object;
    } catch (error) {
      console.error('Invalid token:', error);
      return undefined;
    }
  }
  
  