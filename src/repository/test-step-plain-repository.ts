import { injectable } from "inversify";
import { prismaClient } from "../application/database";
import { ITestStepPlainRepository } from "../interface/repository/test-step-plain-repository-interface";
import { PlainTestStepInsertRequest, PlainTestStepNumRespone, PlainTestStepResponse } from "../model/model";

@injectable()
export class TestStepPlainRepository implements ITestStepPlainRepository {
  constructor() {}

  public async checkLastPlainTestStep(reportId: number): Promise<PlainTestStepNumRespone | null> {
    return prismaClient.testStepPlain.findFirst({
      orderBy: { step_number: "desc" },
      where: {
        report_id: reportId,
      },
      select: {
        step_number: true,
      },
    });
  }

  public async createPlainTestStep(plainTestStepInsertRequest: PlainTestStepInsertRequest): Promise<void> {
    await prismaClient.testStepPlain.create({
      data: plainTestStepInsertRequest,
    });
  }

  public async findAllPlainTestStep(reportId: number): Promise<PlainTestStepResponse[]> {
    return prismaClient.testStepPlain.findMany({
      where: {
        report_id: reportId,
      },
      orderBy: {
        step_number: "asc",
      },
      select: {
        step_number: true,
        title: true,
        description: true,
        status: {
          select: {
            name: true,
          },
        },
      },
    });
  }
}
