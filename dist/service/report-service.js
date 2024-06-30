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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const inversify_1 = require("inversify");
const validation_1 = require("../validation/validation");
const report_validation_1 = require("../validation/report-validation");
const auth_util_1 = require("../utils/auth-util");
let ReportService = class ReportService {
    constructor(projectRepository, scenarioRepository, testCaseRepository, toolRepository, reportRepository) {
        this.projectRepository = projectRepository;
        this.scenarioRepository = scenarioRepository;
        this.testCaseRepository = testCaseRepository;
        this.toolRepository = toolRepository;
        this.reportRepository = reportRepository;
    }
    createReport(reportRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawRequest = validation_1.Validation.validate(report_validation_1.ReportValidation.reportSchema, reportRequest);
            const projectId = yield this.projectRepository.createOrGetProjectId(rawRequest.project);
            const scenarioId = yield this.scenarioRepository.createOrGetScenarioId(rawRequest.scenario, projectId);
            const testCaseId = yield this.testCaseRepository.createOrGetTestCaseId(rawRequest.scenario, scenarioId);
            const toolId = yield this.toolRepository.createOrGetToolId(rawRequest.tool);
            const reportInserRequest = {
                project_id: projectId,
                scenario_id: scenarioId,
                test_case_id: testCaseId,
                tool_id: toolId,
                author: rawRequest.author,
            };
            const result = yield this.reportRepository.createReport(reportInserRequest);
            return auth_util_1.AuthUtil.signJwt(result);
        });
    }
    saveReport() { }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("IProjectRepository")),
    __param(1, (0, inversify_1.inject)("IScenarioRepository")),
    __param(2, (0, inversify_1.inject)("ITestCaseRepository")),
    __param(3, (0, inversify_1.inject)("IToolRepository")),
    __param(4, (0, inversify_1.inject)("IReportRepository")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], ReportService);
