import {
  ImageDetailInsertRequest,
  TestStepInsertRequest,
  TestStepResponse,
  TestStepResponseWithId,
} from "../../model/model";

export interface ITestStepRepository {
  createImageDetail(imageDetail: ImageDetailInsertRequest): Promise<{ id: number }>;
  checkLastTestStep(sectionId: number): Promise<TestStepResponseWithId | null>;
  updateTestStep(reportDetail: TestStepInsertRequest): Promise<void>;
  checkTestStepIsExist(sectionId: number, detailId: number): Promise<TestStepResponse | null>;
}
