import { asc, count, eq, ilike, sql } from "drizzle-orm";
import { injectable } from "inversify";
import { drizzleClient } from "../application/database";
import { projects, tools } from "../db/schema";
import { IToolRepository } from "../interface/repository/repository-interface";
import { IdAndName } from "../model/model";

@injectable()
export class ToolRepository implements IToolRepository {
  async createTool(toolName: string): Promise<void> {
    await drizzleClient.insert(tools).values({ name: toolName });
  }

  async checkToolIsExist(toolName: string): Promise<boolean> {
    const result = await drizzleClient.select({ id: tools.id }).from(tools).where(ilike(tools.name, toolName)).limit(1);

    return result.length > 0;
  }

  async getTools(page: number, search?: string): Promise<IdAndName[]> {
    return drizzleClient.query.tools.findMany({
      where: search ? ilike(tools.name, `%${search}%`) : undefined,
      limit: 10,
      offset: (page - 1) * 10,
      orderBy: asc(tools.name),
    });
  }

  async getAllTools(): Promise<IdAndName[]> {
    return drizzleClient.select({ id: tools.id, name: tools.name }).from(tools);
  }

  async countTotalTools(search?: string): Promise<number> {
    const rowCount = await drizzleClient
      .select({ count: count() })
      .from(tools)
      .where(search ? ilike(tools.name, `%${search}%`) : undefined);

    return rowCount[0].count;
  }

  async getToolByName(toolName: string): Promise<IdAndName | undefined> {
    return drizzleClient.query.tools.findFirst({
      where: ilike(tools.name, `%${toolName}%`),
    });
  }

  async getToolById(id: number): Promise<IdAndName | undefined> {
    return drizzleClient.query.tools.findFirst({
      where: eq(tools.id, id),
    });
  }

  async updateTool(id: number, toolName: string): Promise<void> {
    await drizzleClient.update(tools).set({ name: toolName }).where(eq(tools.id, id));
  }

  async deleteTool(id: number): Promise<void> {
    await drizzleClient.delete(tools).where(eq(tools.id, id));
  }

  async countUsedToolInProject(id: number): Promise<number> {
    const result = await drizzleClient
      .select({ count: sql<number>`COUNT(${projects.id})`.as("count") })
      .from(tools)
      .leftJoin(projects, eq(tools.id, projects.toolId))
      .where(eq(tools.id, id));

    const count = result[0].count;

    return count;
  }
}
