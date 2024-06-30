"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportValidation = void 0;
const zod_1 = require("zod");
class ReportValidation {
}
exports.ReportValidation = ReportValidation;
ReportValidation.reportSchema = zod_1.z.object({
    project: zod_1.z.string().min(3).max(50),
    scenario: zod_1.z.string().min(3).max(100),
    test_case: zod_1.z.string().min(3).max(100),
    tool: zod_1.z.string().min(3).max(50),
    author: zod_1.z.string().min(3).max(50),
});
