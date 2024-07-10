import jwt from "jsonwebtoken";
import { ResponseError } from "../error/response-error";

export class AuthUtil {
  static signJwt(payload: { id: number }): string {
    const secretKey = process.env.SECRET_KEY as string;

    try {
      return jwt.sign(payload, secretKey, {
        expiresIn: "1d",
      });
    } catch (e: any) {
      throw e
    }
  }

  static verifyJwt(token: string): { id: number } {
    const secretKey = process.env.SECRET_KEY as string;

    try {
      return jwt.verify(token, secretKey) as { id: number };
    } catch (e) {
      throw new ResponseError(401, "Unauthorized");
    }
  }
}
