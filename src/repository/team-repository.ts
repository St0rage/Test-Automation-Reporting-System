import { asc, count, eq, like } from "drizzle-orm";
import { injectable } from "inversify";
import { drizzleClient } from "../application/database";
import { teams } from "../db/schema";
import { ITeamRepository } from "../interface/repository/repository-interface";
import { IdAndName } from "../model/model";

@injectable()
export class TeamRepository implements ITeamRepository {
  async createTeam(teamName: string): Promise<void> {
    await drizzleClient.insert(teams).values({ name: teamName });
  }

  async checkTeamIsExist(teamName: string): Promise<boolean> {
    const result = await drizzleClient.select({ id: teams.id }).from(teams).where(eq(teams.name, teamName)).limit(1);

    return result.length > 0;
  }

  async getTeams(page: number, search?: string): Promise<IdAndName[]> {
    return await drizzleClient.query.teams.findMany({
      where: search ? like(teams.name, `%${search}%`) : undefined,
      columns: {
        id: true,
        name: true,
      },
      limit: 10,
      offset: (page - 1) * 10,
      orderBy: asc(teams.name),
    });
  }

  async getAllTeams(): Promise<IdAndName[]> {
    return await drizzleClient.select({ id: teams.id, name: teams.name }).from(teams);
  }

  async countTotalTeams(search?: string): Promise<number> {
    const rowCount = await drizzleClient
      .select({ count: count() })
      .from(teams)
      .where(search ? like(teams.name, `%${search}%`) : undefined);

    return rowCount[0].count;
  }

  async deleteTeam(id: number): Promise<void> {
    await drizzleClient.delete(teams).where(eq(teams.id, id));
  }

  async getTeamById(id: number): Promise<IdAndName | undefined> {
    return await drizzleClient.query.teams.findFirst({
      where: eq(teams.id, id),
      columns: {
        id: true,
        name: true,
      },
    });
  }

  async getTeamByName(teamName: string): Promise<IdAndName | undefined> {
    return await drizzleClient.query.teams.findFirst({
      where: eq(teams.name, teamName),
      columns: {
        id: true,
        name: true,
      },
    });
  }

  async updateTeam(id: number, teamName: string): Promise<void> {
    await drizzleClient.update(teams).set({ name: teamName }).where(eq(teams.id, id));
  }
}
