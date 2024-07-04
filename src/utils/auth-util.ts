import jwt from "jsonwebtoken";
import { ResponseError } from "../error/response-error";

export class AuthUtil {
  static async signJwt(payload: number): Promise<string> {
    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
      throw new ResponseError(500, "Internal Server Error");
    }

    return jwt.sign({ payload }, secretKey, {
      expiresIn: "1d",
    });
  }
}
