import dotenv from "dotenv";
import "reflect-metadata";
import { web } from "./application/web";
import { FileSystem } from "./utils/file-system-util";

dotenv.config();

const imagePath = process.env.IMAGE_PATH;
if (!imagePath) {
  throw Error("IMAGE_PATH not found in ENV");
}
const reportPath = process.env.REPORT_PATH;
if (!reportPath) {
  throw Error("REPORT_PATH not found in ENV");
}
const logPath = process.env.LOG_PATH;
if (!logPath) {
  throw Error("LOG_PATH not found in ENV");
}
if (!process.env.SECRET_KEY) {
  throw Error("SECRET_KEY not found in ENV");
}

try {
  FileSystem.createFolder(imagePath);
  FileSystem.createFolder(reportPath);
  FileSystem.createFolder(logPath);
} catch (e) {
  throw e;
}

const port = 7000;

web.listen(port, () => {
  console.info(`Listening on Port ${port}`);
});
