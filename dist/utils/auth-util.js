"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUtil = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_error_1 = require("../error/response-error");
class AuthUtil {
    static signJwt(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const secretKey = process.env.SECRET_KEY;
            if (!secretKey) {
                throw new response_error_1.ResponseError(500, "Internal Server Error");
            }
            return jsonwebtoken_1.default.sign({ payload }, secretKey, {
                expiresIn: "1d",
            });
        });
    }
}
exports.AuthUtil = AuthUtil;
