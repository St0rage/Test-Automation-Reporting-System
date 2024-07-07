import jwt from "jsonwebtoken";
import { ResponseError } from "../error/response-error";

export class AuthUtil {
  static async signJwt(payload: { id: number }): Promise<string> {
    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
      throw new ResponseError(500, "Internal Server Error");
    }

    try {
      return jwt.sign(payload, secretKey, {
        expiresIn: "1d",
      });
    } catch (e) {
      throw new ResponseError(500, "Internal Server Error");
    }
  }

  static async verifyJwt(token: string): Promise<{ id: number }> {
    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
      throw new ResponseError(500, "Internal Server Error");
    }

    try {
      return jwt.verify(token, secretKey) as { id: number };
    } catch (e) {
      throw new ResponseError(401, "Unauthorized");
    }
  }
}
