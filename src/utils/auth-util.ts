import jwt from "jsonwebtoken";
import { ResponseError } from "../error/response-error";

export class AuthUtil {
  static signJwt(payload: { id: number }): Promise<string> {
    const secretKey = process.env.SECRET_KEY as string;

    return new Promise((resolve, reject) => {
      jwt.sign(payload, secretKey, { expiresIn: "1d" }, (err, token) => {
        if (err) {
          return reject(new Error(err.message));
        }
        resolve(token as string);
      });
    });
  }

  static verifyJwt(token: string): Promise<{ id: number }> {
    const secretKey = process.env.SECRET_KEY as string;

    return new Promise((resolve, reject) => {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return reject(new ResponseError(401, "Unauthorized"));
        }
        resolve(decoded as { id: number });
      });
    });
  }
}
