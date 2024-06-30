"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicRouter = void 0;
const express_1 = __importDefault(require("express"));
class PublicRouter {
    constructor(reportController) {
        this.reportController = reportController;
        this.router = express_1.default.Router();
    }
    config() {
        this.router.post("/api/create-report");
    }
}
exports.PublicRouter = PublicRouter;
