import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import { IProjectService } from "../interface/service/service-interface";
import {
  CreateProjectRequest,
  EditProjectRequest,
  IdAndName,
  ProjectAdditional,
  ProjectAdditionalEditRequest,
  ProjectDashboard,
  ProjectDashboardEditRequest,
  ProjectResponse,
  ProjectResponseEdit,
} from "../model/model";
import { IProjectRepository, ITeamRepository, IToolRepository } from "../interface/repository/repository-interface";
import { ResponseError } from "../error/response-error";

@injectable()
export class ProjectService implements IProjectService {
  constructor(
    @inject(TYPES.IProjectRepository) private projectRepository: IProjectRepository,
    @inject(TYPES.ITeamRepository) private teamRepository: ITeamRepository,
    @inject(TYPES.IToolRepository) private toolRepository: IToolRepository
  ) {}

  async getAllTeams(): Promise<IdAndName[]> {
    return this.teamRepository.getAllTeams();
  }

  async getAllTools(): Promise<IdAndName[]> {
    return this.toolRepository.getAllTools();
  }

  async createProject(projectRequest: CreateProjectRequest): Promise<void> {
    await this.projectRepository.createProject(projectRequest);
  }

  async checkProjectIsExist(projectName: string): Promise<boolean> {
    return this.projectRepository.checkProjectIsExist(projectName);
  }

  async checkProjectIsExistByTeamId(projectName: string, teamId: number): Promise<boolean> {
    return this.projectRepository.checkProjectIsExistByTeamId(projectName, teamId);
  }

  async getProjects(page: number, search?: string): Promise<ProjectResponse[]> {
    return this.projectRepository.getProjects(page, search);
  }

  async getTotalProjects(search?: string): Promise<number> {
    return this.projectRepository.countTotalProjects(search);
  }

  async getProjectById(id: number): Promise<ProjectResponseEdit> {
    const project = await this.projectRepository.getProjectById(id);

    if (!project) {
      throw new ResponseError(404, "Not Found");
    }

    return project;
  }

  async getProjectByNameAndTeamId(projectName: string, teamId: number): Promise<ProjectResponseEdit> {
    const project = await this.projectRepository.getProjectByNameAndByTeamId(projectName, teamId);

    if (!project) {
      throw new ResponseError(404, "Not Found");
    }

    return project;
  }

  async editProject(editProjectRequest: EditProjectRequest): Promise<void> {
    return this.projectRepository.updateProject(editProjectRequest);
  }

  async deleteProject(id: number): Promise<void> {
    await this.projectRepository.deleteProject(id);
  }

  async getProjectDashboardByNameAndTeamId(projectName: string, teamId: number): Promise<ProjectDashboard> {
    const dashboardData = await this.projectRepository.getProjectDashboardByNameAndTeamId(projectName, teamId);

    if (!dashboardData) {
      throw new ResponseError(404, "Not Found");
    }

    return dashboardData;
  }

  async editProjectDashboard(editProjectDashboardReq: ProjectDashboardEditRequest): Promise<void> {
    return this.projectRepository.updateProjectDashboard(editProjectDashboardReq);
  }

  async getProjectAdditionalByNameAndTeamId(projectName: string, teamId: number): Promise<ProjectAdditional> {
    const additionalData = await this.projectRepository.getProjectAdditionalByNameAndTeamId(projectName, teamId);

    if (!additionalData) {
      throw new ResponseError(404, "Not Found");
    }

    return additionalData;
  }

  async editProjectAdditional(editProjectAdditionalReq: ProjectAdditionalEditRequest): Promise<void> {
    return this.projectRepository.updateProjectAdditional(editProjectAdditionalReq);
  }
}
