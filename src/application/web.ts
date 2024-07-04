import express, { Express } from "express";
import { Logger } from "./logger";
import { Middleware } from "../middleware/middleware";
import { Route } from "../route/route";
import { container } from "../di/inversify.config";
export class Web {
  private web: Express;
  private logger: Logger;
  private route: Route;

  constructor() {
    this.logger = container.get<Logger>(Logger);
    this.route = container.get<Route>(Route);
    this.web = express();
    this.web.use(express.json());
    this.web.use(this.route.getPublicRoute());
    this.web.use(Middleware.errorMiddleware);
  }

  public start(port: number) {
    this.web.listen(port, () => {
      this.logger.log.info(`Listening on Port ${port}`);
    });
  }
}
