import { injectable } from "inversify";
import { prismaClient } from "../application/database";
import { IToolRepository } from "../interface/repository/tool-repository-interface";

@injectable()
export class ToolRepository implements IToolRepository {
  constructor() {}

  async createOrGetToolId(toolName: string): Promise<number> {
    let result = await prismaClient.tool.findFirst({
      where: {
        name: toolName,
      },
      select: {
        id: true,
      },
    });

    if (result == null) {
      result = await prismaClient.tool.create({
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
