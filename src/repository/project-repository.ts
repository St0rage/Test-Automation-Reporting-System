import { and, asc, count, eq, ilike } from "drizzle-orm";
import { injectable } from "inversify";
import { drizzleClient } from "../application/database";
import { projects } from "../db/schema";
import { IProjectRepository } from "../interface/repository/repository-interface";
import {
  CreateProjectRequest,
  EditProjectRequest,
  ProjectAdditional,
  ProjectAdditionalEditRequest,
  ProjectDashboard,
  ProjectDashboardEditRequest,
  ProjectResponse,
  ProjectResponseEdit,
} from "../model/model";

@injectable()
export class ProjectRepository implements IProjectRepository {
  constructor() {}

  async createProject(projectRequest: CreateProjectRequest): Promise<void> {
    await drizzleClient.insert(projects).values(projectRequest);
  }

  async checkProjectIsExist(projectName: string): Promise<boolean> {
    const result = await drizzleClient
      .select({ id: projects.id })
      .from(projects)
      .where(ilike(projects.name, projectName))
      .limit(1);

    return result.length > 0;
  }

  async checkProjectIsExistByTeamId(projectName: string, teamId: number): Promise<boolean> {
    const result = await drizzleClient
      .select({ id: projects.id })
      .from(projects)
      .where(and(ilike(projects.name, projectName), eq(projects.teamId, teamId)))
      .limit(1);

    return result.length > 0;
  }

  async getProjects(page: number, search?: string): Promise<ProjectResponse[]> {
    return drizzleClient.query.projects.findMany({
      where: search ? ilike(projects.name, `%${search}%`) : undefined,
      columns: {
        id: true,
        name: true,
      },
      with: {
        team: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
      limit: 10,
      offset: (page - 1) * 10,
      orderBy: [asc(projects.name), asc(projects.teamId)],
    });
  }

  async countTotalProjects(search?: string): Promise<number> {
    const rowCount = await drizzleClient
      .select({ count: count() })
      .from(projects)
      .where(search ? ilike(projects.name, `%${search}%`) : undefined);

    return rowCount[0].count;
  }

  async getProjectById(id: number): Promise<ProjectResponseEdit | undefined> {
    return drizzleClient.query.projects.findFirst({
      where: eq(projects.id, id),
      columns: {
        id: true,
        name: true,
      },
      with: {
        team: {
          columns: {
            id: true,
            name: true,
          },
        },
        tool: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async getProjectByNameAndByTeamId(projectName: string, teamId: number): Promise<ProjectResponseEdit | undefined> {
    return drizzleClient.query.projects.findFirst({
      where: and(ilike(projects.name, `%${projectName}%`), eq(projects.teamId, teamId)),
      columns: {
        id: true,
        name: true,
      },
      with: {
        team: {
          columns: {
            id: true,
            name: true,
          },
        },
        tool: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async updateProject(editProjectRequest: EditProjectRequest): Promise<void> {
    await drizzleClient
      .update(projects)
      .set({ name: editProjectRequest.name, teamId: editProjectRequest.teamId, toolId: editProjectRequest.toolId })
      .where(eq(projects.id, editProjectRequest.id));
  }

  async deleteProject(id: number): Promise<void> {
    await drizzleClient.delete(projects).where(eq(projects.id, id));
  }

  async getProjectDashboardByNameAndTeamId(projectName: string, teamId: number): Promise<ProjectDashboard | undefined> {
    return drizzleClient.query.projects.findFirst({
      where: and(ilike(projects.name, `%${projectName}%`), eq(projects.teamId, teamId)),
      columns: {
        id: true,
        name: true,
        manualModule: true,
        manualScenario: true,
        manualTestcase: true,
        possibleTestcase: true,
      },
      with: {
        team: {
          columns: {
            id: true,
            name: true,
          },
        },
        tool: {
          columns: {
            name: true,
          },
        },
      },
    });
  }

  async updateProjectDashboard(editProjectDashboardReq: ProjectDashboardEditRequest): Promise<void> {
    await drizzleClient
      .update(projects)
      .set({
        manualModule: editProjectDashboardReq.manualModule,
        manualScenario: editProjectDashboardReq.manualScenario,
        manualTestcase: editProjectDashboardReq.manualTestcase,
        possibleTestcase: editProjectDashboardReq.possibleTestcase,
      })
      .where(eq(projects.id, editProjectDashboardReq.id));
  }

  async getProjectAdditionalByNameAndTeamId(
    projectName: string,
    teamId: number
  ): Promise<ProjectAdditional | undefined> {
    return drizzleClient.query.projects.findFirst({
      where: and(ilike(projects.name, `%${projectName}%`), eq(projects.teamId, teamId)),
      columns: {
        id: true,
        name: true,
        repository: true,
        externalRsc: true,
        jira: true,
        testScript: true,
      },
      with: {
        team: {
          columns: {
            id: true,
          },
        },
      },
    });
  }

  async updateProjectAdditional(editProjectAdditionalReq: ProjectAdditionalEditRequest): Promise<void> {
    await drizzleClient
      .update(projects)
      .set({
        repository: editProjectAdditionalReq.repository,
        jira: editProjectAdditionalReq.jira,
        externalRsc: editProjectAdditionalReq.externalRsc,
        testScript: editProjectAdditionalReq.testScript,
      })
      .where(eq(projects.id, editProjectAdditionalReq.id));
  }
}
