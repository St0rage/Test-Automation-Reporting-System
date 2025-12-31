import {
  ImageDetailInsertRequest,
  PlainTestStepInsertRequest,
  PlainTestStepResponse,
  TestStepInsertRequest,
  TestStepResponse,
  TestStepResponseWithId,
} from "../../model/model";

export interface ITestStepRepository {
  createImageDetail(imageDetail: ImageDetailInsertRequest): Promise<{ id: number }>;
  createPlainTestStep(plainTestStepInsertRequest: PlainTestStepInsertRequest): Promise<void>;
  checkLastTestStep(sectionId: number): Promise<TestStepResponseWithId | null>;
  checkLastPlainTestStep(sectionId: number): Promise<PlainTestStepResponse | null>;
  updateTestStep(reportDetail: TestStepInsertRequest): Promise<void>;
  checkTestStepIsExist(sectionId: number, detailId: number): Promise<TestStepResponse | null>;
}
