"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
const zod_1 = require("zod");
const response_error_1 = require("../error/response-error");
class Middleware {
    errorMiddleware(error, req, res, next) {
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({
                errors: `Validation Error : ${JSON.stringify(error)}`,
            });
        }
        else if (error instanceof response_error_1.ResponseError) {
            res.status(error.status).json({
                errors: error.message,
            });
        }
        else {
            res.status(500).json({
                errors: "Internal Server Error",
            });
        }
    }
}
exports.Middleware = Middleware;
