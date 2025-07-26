import { injectable } from "inversify";
import { IModuleRepository } from "../interface/repository/repository-interface";
import { drizzleClient } from "../application/database";
import { modules, scenarios, testcases } from "../db/schema";
import { and, eq, ilike, sql } from "drizzle-orm";
import { CreateModuleRequest, ModuleResponse } from "../model/model";

@injectable()
export class ModuleRepository implements IModuleRepository {
  async createModule(moduleRequest: CreateModuleRequest): Promise<void> {
    await drizzleClient.insert(modules).values({ name: moduleRequest.moduleName, projectId: moduleRequest.id });
  }

  async checkModuleIsExist(moduleName: string, projectId: number): Promise<boolean> {
    const result = await drizzleClient
      .select({ id: modules.id })
      .from(modules)
      .where(and(ilike(modules.name, moduleName), eq(modules.projectId, projectId)))
      .limit(1);

    return result.length > 0;
  }

  async getModulesByProjectId(projectId: number): Promise<ModuleResponse[]> {
    return drizzleClient
      .select({
        id: modules.id,
        name: modules.name,
        totalScenarios: sql<number>`COUNT (DISTINCT ${scenarios.id})`,
        totalTestCases: sql<number>`COUNT (${scenarios.id})`,
      })
      .from(modules)
      .leftJoin(scenarios, eq(modules.id, scenarios.id))
      .leftJoin(testcases, eq(scenarios.id, testcases.id))
      .where(eq(modules.projectId, projectId))
      .groupBy(modules.id, modules.name)
      .orderBy(modules.id);
  }
}
