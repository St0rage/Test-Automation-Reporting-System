import { Request } from "express";

export interface exRequest extends Request {
  reportId?: number;
}
