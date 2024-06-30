"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web = void 0;
const express_1 = __importDefault(require("express"));
const logger_1 = require("./logger");
const report_controller_1 = require("../controller/report-controller");
const inversify_config_1 = require("../inversify.config");
const public_1 = require("../route/public");
const inversify_1 = require("inversify");
const middleware_1 = require("../middleware/middleware");
let Web = class Web {
    constructor(logger) {
        this.logger = logger;
        this.middleware = new middleware_1.Middleware();
        this.web = (0, express_1.default)();
        this.web.use(express_1.default.json());
        this.configRouter();
        this.web.use(this.middleware.errorMiddleware);
    }
    configRouter() {
        // controller
        const reportController = inversify_config_1.container.get(report_controller_1.ReportController);
        // route
        const publicRouter = new public_1.PublicRouter(reportController);
        // use
        this.web.use(publicRouter.router);
    }
    start(port) {
        this.web.listen(port, () => {
            this.logger.info(`Listening on Port ${port}`);
        });
    }
};
exports.Web = Web;
exports.Web = Web = __decorate([
    __param(0, (0, inversify_1.inject)(logger_1.Logger)),
    __metadata("design:paramtypes", [logger_1.Logger])
], Web);
