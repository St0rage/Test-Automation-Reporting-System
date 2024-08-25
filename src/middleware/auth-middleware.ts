import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../error/response-error";
import { AuthUtil } from "../utils/auth-util";
import { container } from "../di/inversify.config";
import { IReportRepository } from "../interface/repository/report-repository-interface";
import { TYPES } from "../di/types";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const reportRepository = container.get<IReportRepository>(
      TYPES.IReportRepository
    );

    const token = req.headers.authorization;

    if (!token) {
      throw new ResponseError(401, "Unauthorized");
    }

    const decoded = await AuthUtil.verifyJwt(token.split(" ")[1]);

    const isReportExist = await reportRepository.checkReportIsExist(decoded.id);

    if (!isReportExist) {
      throw new ResponseError(401, "Unauthorized");
    }

    res.locals.reportId = decoded.id;
    next();
  } catch (e) {
    next(e);
  }
};
