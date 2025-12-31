import { injectable } from "inversify";
import { ISectionRepository } from "../interface/repository/section-repository-interface";
import { SectionFullPlainRespone, SectionFullRespone, SectionInsertRequest, SectionResponse } from "../model/model";
import { prismaClient } from "../application/database";

@injectable()
export class SectionRepository implements ISectionRepository {
  constructor() {}

  async createSection(sectionInsertRequest: SectionInsertRequest): Promise<void> {
    await prismaClient.section.create({
      data: sectionInsertRequest,
    });
  }

  async checkLastSection(reportId: number): Promise<SectionResponse | null> {
    return prismaClient.section.findFirst({
      orderBy: { section_number: "desc" },
      where: {
        report_id: reportId,
      },
      select: {
        id: true,
        name: true,
        section_number: true,
      },
    });
  }

  async findAllSectionAndTestStepByReportId(reportId: number): Promise<SectionFullRespone[]> {
    return prismaClient.section.findMany({
      where: {
        report_id: reportId,
      },
      orderBy: {
        section_number: "asc",
      },
      select: {
        section_number: true,
        name: true,
        test_steps: {
          orderBy: {
            step_number: "asc",
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
        },
      },
    });
  }

  findAllSectionAndPlainTestStepByReportId(reportId: number): Promise<SectionFullPlainRespone[]> {
    return prismaClient.section.findMany({
      where: {
        report_id: reportId,
      },
      orderBy: {
        section_number: "asc",
      },
      select: {
        section_number: true,
        name: true,
        test_steps: {
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
        },
      },
    });
  }
}
