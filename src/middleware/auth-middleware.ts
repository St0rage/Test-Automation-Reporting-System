import { NextFunction, Response } from "express";
import { exRequest } from "../type/exrequest";
import { ResponseError } from "../error/response-error";
import { AuthUtil } from "../utils/auth-util";

export const  authMiddleware =  (req: exRequest, res: Response, next: NextFunction): void => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            throw new ResponseError(401, "Unauthorized");
        }

        const decoded = AuthUtil.verifyJwt(token.split(" ")[1]);

        req.reportId = decoded.id;
        next();
    } catch (e) {
        next(e)
    }
}