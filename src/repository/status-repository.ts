import { inject, injectable } from "inversify";
import { Database } from "../application/database";
import { IStatusRepository } from "../interface/repository/status-repository-interface";

@injectable()
export class StatusRepository implements IStatusRepository {
  private db: Database;

  constructor(@inject(Database) db: Database) {
    this.db = db;
  }

  async getStatusId(statusName: string): Promise<{ id: number }> {
    return (await this.db.prismaClient.status.findFirst({
      where: {
        name: statusName,
      },
      select: {
        id: true,
      },
    })) as { id: number };
  }
}
