import { injectable } from "inversify";
import { drizzleClient } from "../application/database";
import { userTeams } from "../db/schema";
import { IUserTeamRepository } from "../interface/repository/repository-interface";
import { UserTeamRequest } from "../model/model";
import { and, eq } from "drizzle-orm";

@injectable()
export class UserTeamRepository implements IUserTeamRepository {
  async createUserTeam(userTeamRequest: UserTeamRequest): Promise<void> {
    await drizzleClient.insert(userTeams).values(userTeamRequest);
  }

  async updateUserTeam(userTeamRequest: UserTeamRequest): Promise<void> {
    await drizzleClient
      .update(userTeams)
      .set({ leader: userTeamRequest.leader })
      .where(and(eq(userTeams.teamId, userTeamRequest.teamId), eq(userTeams.userId, userTeamRequest.userId)));
  }

  async deleteUserTeam(teamId: number, userId: number): Promise<void> {
    await drizzleClient.delete(userTeams).where(and(eq(userTeams.teamId, teamId), eq(userTeams.userId, userId)));
  }
}
