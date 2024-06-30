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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const client_1 = require("@prisma/client");
const inversify_1 = require("inversify");
const logger_1 = require("./logger");
let Database = class Database extends client_1.PrismaClient {
    constructor(logger) {
        super({
            log: [
                { emit: "event", level: "query" },
                { emit: "event", level: "info" },
                { emit: "event", level: "warn" },
                { emit: "event", level: "error" },
            ],
        });
        this.$on("error", (e) => {
            logger.error(e);
        });
        this.$on("warn", (e) => {
            logger.warn(e);
        });
        this.$on("info", (e) => {
            logger.info(e);
        });
        this.$on("query", (e) => {
            logger.info(e);
        });
    }
};
exports.Database = Database;
exports.Database = Database = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(logger_1.Logger)),
    __metadata("design:paramtypes", [logger_1.Logger])
], Database);
