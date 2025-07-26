import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import { IModuleService, IProjectService } from "../interface/service/service-interface";
import {
  CreateModuleRequest,
  CreateProjectRequest,
  EditProjectRequest,
  ProjectAdditionalEditRequest,
  ProjectDashboardEditRequest,
} from "../model/model";

@injectable()
export class ProjectController {
  constructor(
    @inject(TYPES.IProjectService) private projectService: IProjectService,
    @inject(TYPES.IModuleService) private moduleService: IModuleService
  ) {}

  async projectsView(req: Request, res: Response, next: NextFunction) {
    try {
      const pageNumber: number = parseInt(req.query.page as string);
      const search = req.query.search as string | undefined;

      const projectAlert = req.flash("project-alert");

      const projects = await this.projectService.getProjects(pageNumber, search);
      const totalProjects = await this.projectService.getTotalProjects(search);
      res.status(200).render("page/projects", {
        activeMenu: "Projects",
        projects: projects,
        projectAlert: projectAlert,
        page: pageNumber,
        totalProjects: totalProjects,
        searchQuery: search,
      });
    } catch (e) {
      next(e);
    }
  }

  async addProjectView(req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await this.projectService.getAllTeams();
      const tools = await this.projectService.getAllTools();

      res.status(200).render("page/project-registration-admin", {
        activeMenu: "Projects",
        tools: tools,
        teams: teams,
        selectedTool: 0,
        selectedTeam: 0,
        errorData: {
          name: undefined,
          toolId: undefined,
          teamId: undefined,
        },
        formData: {
          name: undefined,
          toolId: undefined,
          teamId: undefined,
        },
      });
    } catch (e) {
      next(e);
    }
  }

  async addProject(req: Request, res: Response, next: NextFunction) {
    try {
      const projectRequest: CreateProjectRequest = req.body as CreateProjectRequest;

      await this.projectService.createProject(projectRequest);

      req.flash("project-alert", "Berhasil Menambahkan Project");
      return res.status(200).redirect("/projects");
    } catch (e) {
      next(e);
    }
  }

  async editProjectView(req: Request, res: Response, next: NextFunction) {
    try {
      const { teamId, projectName } = req.params;

      const project = await this.projectService.getProjectByNameAndTeamId(projectName, parseInt(teamId));
      const tools = await this.projectService.getAllTools();
      const teams = await this.projectService.getAllTeams();

      res.status(200).render("page/project-edit-admin", {
        activeMenu: "Teams",
        originalProjectName: project.name,
        originalTeamId: project.team.id,
        tools: tools,
        teams: teams,
        currentProjectId: project.id,
        currentProjectName: project.name,
        currentToolId: project.tool.id,
        currentTeamId: project.team.id,
        errorData: {
          name: undefined,
          toolId: undefined,
          teamId: undefined,
        },
      });
    } catch (e) {
      next(e);
    }
  }

  async editProject(req: Request, res: Response, next: NextFunction) {
    try {
      const projectEditRequest: EditProjectRequest = req.body as EditProjectRequest;

      await this.projectService.editProject(projectEditRequest);

      req.flash("project-alert", "Berhasil Mengubah Project");
      return res.status(200).redirect("/projects");
    } catch (e) {
      next(e);
    }
  }

  async deleteProject(req: Request, res: Response, next: NextFunction) {
    try {
      const projectId: number = parseInt(req.body.id);
      const page: string = req.body.page;
      const searchQuery: string = req.body.searchQuery;

      await this.projectService.deleteProject(projectId);
      req.flash("project-alert", "Berhasil Delete Project");
      return res.status(200).redirect(`/projects?page=${page}${searchQuery ? "&search=" + searchQuery : ""}`);
    } catch (e) {
      next(e);
    }
  }

  async dashboardProjectView(req: Request, res: Response, next: NextFunction) {
    try {
      const { teamId, projectName } = req.params;
      const dashboardData = await this.projectService.getProjectDashboardByNameAndTeamId(projectName, Number(teamId));
      const project = {
        teamId: dashboardData.team.id,
        name: dashboardData.name,
      };

      const projectViewAlert = req.flash("project-view-alert");

      res.status(200).render("page/project-view-dashboard", {
        activeMenu: "Projects",
        project: project,
        dashboardData: dashboardData,
        projectViewAlert: projectViewAlert,
      });
    } catch (e) {
      next(e);
    }
  }

  async dashboardProjectEditView(req: Request, res: Response, next: NextFunction) {
    try {
      const { teamId, projectName } = req.params;
      const dashboardData = await this.projectService.getProjectDashboardByNameAndTeamId(projectName, Number(teamId));
      const project = {
        teamId: dashboardData.team.id,
        name: dashboardData.name,
      };
      res.status(200).render("page/project-edit-dashboard", {
        activeMenu: "Projects",
        project: project,
        dashboardData: dashboardData,
        errorData: {
          manualModule: undefined,
          manualScenario: undefined,
          manualTestcase: undefined,
          possibleTestcase: undefined,
        },
      });
    } catch (e) {
      next(e);
    }
  }

  async dashboardProjectEdit(req: Request, res: Response, next: NextFunction) {
    try {
      const editRequest: ProjectDashboardEditRequest = req.body as ProjectDashboardEditRequest;

      await this.projectService.editProjectDashboard(editRequest);

      req.flash("project-view-alert", "Berhasil Mengubah Data Dashboard");
      return res
        .status(200)
        .redirect(`/projects/${editRequest.teamId}/${editRequest.projectName.toLowerCase()}/dashboard`);
    } catch (e) {
      next(e);
    }
  }

  async moduleProjectView(req: Request, res: Response, next: NextFunction) {
    try {
      const { teamId, projectName } = req.params;
      const project = await this.projectService.getProjectByNameAndTeamId(projectName, Number(teamId));
      const modules = await this.moduleService.getModulesByProjectId(project.id);

      const projectViewAlert = req.flash("project-view-alert");

      res.status(200).render("page/project-view-modules", {
        activeMenu: "Projects",
        project: project,
        modules: modules,
        projectViewAlert: projectViewAlert,
      });
    } catch (e) {
      next(e);
    }
  }

  async moduleProjectAddView(req: Request, res: Response, next: NextFunction) {
    try {
      const { teamId, projectName } = req.params;
      const project = await this.projectService.getProjectByNameAndTeamId(projectName, Number(teamId));

      res.status(200).render("page/project-add-modules", {
        activeMenu: "Projects",
        project: project,
        moduleNameError: undefined,
      });
    } catch (e) {
      next(e);
    }
  }

  async moduleProjectAdd(req: Request, res: Response, next: NextFunction) {
    try {
      const moduleRequest: CreateModuleRequest = req.body as CreateModuleRequest;

      await this.moduleService.createModule(moduleRequest);

      req.flash("project-view-alert", "Berhasil Menambah Module");
      return res
        .status(200)
        .redirect(`/projects/${moduleRequest.teamId}/${moduleRequest.projectName.toLowerCase()}/modules`);
    } catch (e) {
      next(e);
    }
  }

  async additionalProjectView(req: Request, res: Response, next: NextFunction) {
    try {
      const { teamId, projectName } = req.params;
      const additionalData = await this.projectService.getProjectAdditionalByNameAndTeamId(projectName, Number(teamId));
      const project = {
        teamId: additionalData.team.id,
        name: additionalData.name,
      };

      const projectViewAlert = req.flash("project-view-alert");

      res.status(200).render("page/project-view-additional", {
        activeMenu: "Projects",
        project: project,
        additionalData: additionalData,
        projectViewAlert: projectViewAlert,
      });
    } catch (e) {
      next(e);
    }
  }

  async additionalProjectEditView(req: Request, res: Response, next: NextFunction) {
    try {
      const { teamId, projectName } = req.params;
      const additionalData = await this.projectService.getProjectAdditionalByNameAndTeamId(projectName, Number(teamId));
      const project = {
        teamId: additionalData.team.id,
        name: additionalData.name,
      };

      res.status(200).render("page/project-edit-additional", {
        activeMenu: "Projects",
        project: project,
        additionalData: additionalData,
        errorData: {
          repository: undefined,
          jira: undefined,
          externalRsc: undefined,
          testScript: undefined,
        },
      });
    } catch (e) {
      next(e);
    }
  }

  async additionalProjectEdit(req: Request, res: Response, next: NextFunction) {
    try {
      const editRequest: ProjectAdditionalEditRequest = req.body as ProjectAdditionalEditRequest;

      await this.projectService.editProjectAdditional(editRequest);

      req.flash("project-view-alert", "Berhasil Mengubah Data Additional");
      return res
        .status(200)
        .redirect(`/projects/${editRequest.teamId}/${editRequest.projectName.toLowerCase()}/additional`);
    } catch (e) {
      next(e);
    }
  }
}
