import { NextFunction, Response } from "express";
import { exRequest } from "../type/exrequest";
import { ResponseError } from "../error/response-error";
import { AuthUtil } from "../utils/auth-util";
import { container } from "../di/inversify.config";
import { IReportRepository } from "../interface/repository/report-repository-interface";
import { TYPES } from "../di/types";

export const authMiddleware = async (
  req: exRequest,
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

    const decoded = AuthUtil.verifyJwt(token.split(" ")[1]);

    const isReportExist = await reportRepository.checkReportIsExist(decoded.id);

    if (!isReportExist) {
      throw new ResponseError(401, "Unauthorized");
    }

    req.reportId = decoded.id;
    next();
  } catch (e) {
    next(e);
  }
};
