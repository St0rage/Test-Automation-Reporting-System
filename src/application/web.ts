import express, { Express } from "express";
import { Logger } from "./logger";
import { ReportController } from "../controller/report-controller";
import { container } from "../inversify.config";
import { PublicRouter } from "../route/public";
import { inject } from "inversify";
import { Middleware } from "../middleware/middleware";

export class Web {
  private web: Express;
  private logger: Logger;
  private middleware: Middleware;

  constructor(@inject(Logger) logger: Logger) {
    this.logger = logger;
    this.middleware = new Middleware();
    this.web = express();
    this.web.use(express.json());
    this.configRouter();
    this.web.use(this.middleware.errorMiddleware);
  }

  private configRouter(): void {
    // controller
    const reportController: ReportController =
      container.get<ReportController>(ReportController);
    // route
    const publicRouter = new PublicRouter(reportController);
    // use
    this.web.use(publicRouter.router);
  }

  public start(port: number) {
    this.web.listen(port, () => {
      this.logger.info(`Listening on Port ${port}`);
    });
  }
}
