import express from "express";
import { publicRoute } from "../route/public-route";
import { privateRoute } from "../route/private-route";
import { errorMiddleware } from "../middleware/error-middleware";
import { logRequestMiddleware } from "../middleware/log-request-middleware";


export const web = express();
web.use(express.json());
web.use(logRequestMiddleware);
web.use(publicRoute)
web.use(privateRoute)
web.use(errorMiddleware)
