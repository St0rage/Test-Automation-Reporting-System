import { injectable } from "inversify";
import { IStatusRepository } from "../interface/repository/status-repository-interface";
import { prismaClient } from "../application/database";

@injectable()
export class StatusRepository implements IStatusRepository {
  constructor() {}

  async getStatusId(statusName: string): Promise<{ id: number }> {
    return (await prismaClient.status.findFirst({
      where: {
        name: statusName.toUpperCase(),
      },
      select: {
        id: true,
      },
    })) as { id: number };
  }
}
