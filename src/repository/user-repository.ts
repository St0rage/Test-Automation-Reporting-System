import { asc, count, eq, like, or } from "drizzle-orm";
import { injectable } from "inversify";
import { drizzleClient } from "../application/database";
import { users } from "../db/schema";
import { IUserRepository } from "../interface/repository/repository-interface";
import { CreateUserInsertRequest, EditUserRequest, IdAndName, UserResponse } from "../model/model";

@injectable()
export class UserRepository implements IUserRepository {
  async getRoles(): Promise<IdAndName[]> {
    return await drizzleClient.query.roles.findMany();
  }

  async createUser(userRequest: CreateUserInsertRequest): Promise<void> {
    await drizzleClient.insert(users).values(userRequest);
  }

  async checkUsernameIsExist(username: string): Promise<boolean> {
    const result = await drizzleClient
      .select({ id: users.id })
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    return result.length > 0;
  }

  async getUsers(page: number, search?: string): Promise<UserResponse[]> {
    return drizzleClient.query.users.findMany({
      where: search ? or(like(users.name, `%${search}%`), like(users.username, `%${search}%`)) : undefined,
      columns: {
        id: true,
        username: true,
        name: true,
        tempPassword: true,
        reset: true,
      },
      with: {
        roles: {
          columns: {
            name: true,
          },
        },
        userTeams: {
          columns: {
            id: false,
            leader: false,
            teamId: false,
            userId: false,
          },
          with: {
            team: {
              columns: {
                name: true,
              },
            },
          },
        },
      },
      limit: 10,
      offset: (page - 1) * 10,
      orderBy: asc(users.name),
    });
  }

  async getUserById(id: number): Promise<UserResponse | undefined> {
    return drizzleClient.query.users.findFirst({
      where: eq(users.id, id),
      columns: {
        id: true,
        username: true,
        name: true,
        tempPassword: true,
        reset: true,
      },
      with: {
        roles: {
          columns: {
            name: true,
          },
        },
        userTeams: {
          columns: {
            id: false,
            leader: false,
            teamId: false,
            userId: false,
          },
          with: {
            team: {
              columns: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async getUserByUsername(username: string): Promise<UserResponse | undefined> {
    return drizzleClient.query.users.findFirst({
      where: eq(users.username, username),
      columns: {
        id: true,
        username: true,
        name: true,
        tempPassword: true,
        reset: true,
      },
      with: {
        roles: {
          columns: {
            name: true,
          },
        },
        userTeams: {
          columns: {
            id: false,
            leader: false,
            teamId: false,
            userId: false,
          },
          with: {
            team: {
              columns: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async countTotalUsers(search?: string): Promise<number> {
    const rowCount = await drizzleClient
      .select({ count: count() })
      .from(users)
      .where(search ? or(like(users.name, `%${search}%`), like(users.username, `%${search}%`)) : undefined);

    return rowCount[0].count;
  }

  async resetPassword(id: number, hashPassword: string, tempPassword: string): Promise<void> {
    await drizzleClient
      .update(users)
      .set({ password: hashPassword, tempPassword: tempPassword, reset: true })
      .where(eq(users.id, id));
  }

  async deleteUser(id: number): Promise<void> {
    await drizzleClient.delete(users).where(eq(users.id, id));
  }

  async updateUser(editUserRequest: EditUserRequest): Promise<void> {
    await drizzleClient
      .update(users)
      .set({
        name: editUserRequest.name,
        username: editUserRequest.username,
        roleId: parseInt(editUserRequest.roleId),
      })
      .where(eq(users.id, editUserRequest.id));
  }
}
