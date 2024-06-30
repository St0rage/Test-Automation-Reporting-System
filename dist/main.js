"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web_1 = require("./application/web");
const inversify_config_1 = require("./inversify.config");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = inversify_config_1.container.get(web_1.Web);
app.start(7000);
