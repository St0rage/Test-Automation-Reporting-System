import "reflect-metadata";
import { Web } from "./application/web";
import dotenv from "dotenv";
import { FileSystem } from "./utils/file-system-uti";

dotenv.config();

const imagePath = process.env.IMAGE_PATH;
if (!imagePath) {
  throw Error("IMAGE_PATH not found in ENV");
}
const reportPath = process.env.REPORT_PATH;
if (!reportPath) {
  throw Error("REPORT_PATH not found in ENV");
}

FileSystem.createFolder(imagePath);
FileSystem.createFolder(reportPath);

const app = new Web();
app.start(7000);
