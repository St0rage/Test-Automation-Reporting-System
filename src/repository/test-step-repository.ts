import { injectable } from "inversify";
import { prismaClient } from "../application/database";
import { ITestStepRepository } from "../interface/repository/test-step-repository-interface";
import {
  ImageDetailInsertRequest,
  TestStepInsertRequest,
  TestStepResponse,
  TestStepResponseWithId,
} from "../model/model";

@injectable()
export class TestStepRepository implements ITestStepRepository {
  constructor() {}

  public async createImageDetail(imageDetail: ImageDetailInsertRequest): Promise<{ id: number }> {
    const result = await prismaClient.testStep.create({
      data: {
        section_id: imageDetail.section_id,
        step_number: imageDetail.step_number,
        image: imageDetail.image,
      },
    });

    return { id: result.id };
  }

  public async checkLastTestStep(section_id: number): Promise<TestStepResponseWithId | null> {
    return prismaClient.testStep.findFirst({
      orderBy: { step_number: "desc" },
      where: {
        section_id: section_id,
      },
      select: {
        id: true,
        step_number: true,
        title: true,
        description: true,
        image: true,
        status: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  public async updateTestStep(testStepInsertRequets: TestStepInsertRequest): Promise<void> {
    await prismaClient.testStep.update({
      where: {
        id: testStepInsertRequets.test_step_id,
      },
      data: {
        title: testStepInsertRequets.title,
        description: testStepInsertRequets.description,
        status_id: testStepInsertRequets.status_id,
      },
    });
  }

  public async checkTestStepIsExist(sectionId: number, testStepId: number): Promise<TestStepResponse | null> {
    return prismaClient.testStep.findFirst({
      where: {
        AND: {
          section_id: sectionId,
          id: testStepId,
        },
      },
      select: {
        step_number: true,
        title: true,
        description: true,
        image: true,
        status: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  // public async findAllTestStepBySectionId(sectionId: number): Promise<TestStepResponse[]> {
  //   return await prismaClient.testStep.findMany({
  //     where: {
  //       section_id: sectionId,
  //     },
  //     select: {
  //       step_number: true,
  //       title: true,
  //       description: true,
  //       image: true,
  //       status: {
  //         select: {
  //           name: true,
  //         },
  //       },
  //     },
  //     orderBy: {
  //       step_number: "asc",
  //     },
  //   });
  // }

  // public async deleteAllTestStepBySectionId(sectionId: number): Promise<void> {
  //   await prismaClient.testStep.deleteMany({
  //     where: {
  //       section_id: sectionId,
  //     },
  //   });
  // }
}
