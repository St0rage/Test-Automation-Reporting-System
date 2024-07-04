import "reflect-metadata";
import { Web } from "./application/web";
import dotenv from "dotenv";

dotenv.config();

const app = new Web();
app.start(7000);
