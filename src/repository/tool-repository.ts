import { inject, injectable } from "inversify";
import { IToolRepository } from "../interface/repository/tool-repository-interface";
import { Database } from "../application/database";

@injectable()
export class ToolRepository implements IToolRepository {
  private db: Database;

  constructor(@inject(Database) db: Database) {
    this.db = db;
  }

  async createOrGetToolId(toolName: string): Promise<number> {
    let result = await this.db.prismaClient.tool.findFirst({
      where: {
        name: toolName,
      },
      select: {
        id: true,
      },
    });

    if (result == null) {
      result = await this.db.prismaClient.tool.create({
        data: {
          name: toolName,
        },
        select: {
          id: true,
        },
      });
    }

    return result.id;
  }
}
