import { PlainTestStepInsertRequest, PlainTestStepNumRespone, PlainTestStepResponse } from "../../model/model";

export interface ITestStepPlainRepository {
  checkLastPlainTestStep(reportId: number): Promise<PlainTestStepNumRespone | null>;
  createPlainTestStep(plainTestStepInsertRequest: PlainTestStepInsertRequest): Promise<void>;
  findAllPlainTestStep(reportId: number): Promise<PlainTestStepResponse[]>;
}
