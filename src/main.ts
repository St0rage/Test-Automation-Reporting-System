import "reflect-metadata";
import { Web } from "./application/web";
import { container } from "./inversify.config";
import dotenv from "dotenv";
import { Logger } from "./application/logger";

dotenv.config();

const logger = container.get<Logger>(Logger);
const app = new Web(logger);
app.start(7000);
