import { injectable } from "inversify";
import { IFileRecord } from "../interface/repository/file-record-repository-interface";
import { prismaClient } from "../application/database";
import { FileRecordResponse } from "../model/model";

@injectable()
export class FileRecordRepository implements IFileRecord {
  constructor() {}

  async findAllFileRecordByScenarioName(
    scenarioName: string,
    page: number
  ): Promise<FileRecordResponse[]> {
    const pageSize = 10;

    return prismaClient.fileRecord.findMany({
      where: {
        scenario: {
          name: scenarioName,
        },
      },
      select: {
        id: true,
        file_name: true,
        created_time: true,
        status: {
          select: {
            name: true,
          },
        },
        test_case: {
          select: {
            name: true,
          },
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { id: "desc" },
    });
  }

  async countTotalFileRecordByScenarioName(
    scenarioName: string
  ): Promise<number> {
    return prismaClient.fileRecord.count({
      where: {
        scenario: {
          name: scenarioName,
        },
      },
    });
  }
}
