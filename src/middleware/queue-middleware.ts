import { NextFunction, Request, Response } from "express";
import { getSessionQueue } from "../application/queue";

export const queueMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = res.locals.token as string;
  const queue = getSessionQueue(token);

  queue?.schedule(async () => {
    next();
  });
};
