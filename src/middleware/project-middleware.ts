import { NextFunction, Request, Response } from "express";
import { container } from "../di/inversify.config";
import { TYPES } from "../di/types";
import { ResponseError } from "../error/response-error";
import { IAdminService, IModuleService, IProjectService } from "../interface/service/service-interface";
import {
  CreateModuleRequest,
  CreateProjectRequest,
  EditProjectRequest,
  ProjectDashboardEditRequest,
} from "../model/model";
import { ProjectValidation } from "../validation/project-validation";

export const projectViewMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = req.query.page;
    const search = req.query.search;

    if (!page || parseInt(page as string) < 1 || search === "") {
      return res.redirect("/projects?page=1");
    }

    next();
  } catch (e) {
    next(e);
  }
};

export const addProjectMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectService = container.get<IProjectService>(TYPES.IProjectService);
    const adminService = container.get<IAdminService>(TYPES.IAdminService);
    const projectRequest: CreateProjectRequest = req.body as CreateProjectRequest;
    const result = ProjectValidation.createProjectSchema.safeParse(projectRequest);
    let isError: boolean = false;
    let error: {
      [x: string]: string[] | undefined;
      [x: number]: string[] | undefined;
      [x: symbol]: string[] | undefined;
    } = {};

    if (!result.success) {
      error = result.error.formErrors.fieldErrors;
      isError = true;
    }

    const isProjectExist = await projectService.checkProjectIsExistByTeamId(projectRequest.name, projectRequest.teamId);

    if (isProjectExist) {
      const team = await adminService.getTeamById(projectRequest.teamId);
      error["name"] = [`Project Sudah Terdaftar di Team ${team.name}`];
      isError = true;
    }

    if (isError) {
      const teams = await projectService.getAllTeams();
      const tools = await projectService.getAllTools();

      return res.status(400).render("page/project-registration-admin", {
        activeMenu: "Users",
        tools: tools,
        teams: teams,
        selectedTool: projectRequest.toolId,
        selectedTeam: projectRequest.teamId,
        formData: projectRequest,
        errorData: error,
      });
    }

    next();
  } catch (e) {
    next(e);
  }
};

export const projectUrlValidationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectService = container.get<IProjectService>(TYPES.IProjectService);
    const { teamId, projectName } = req.params;

    const isProjectExist = await projectService.checkProjectIsExistByTeamId(projectName, parseInt(teamId));

    if (!isProjectExist) {
      throw new ResponseError(404, "Not Found");
    }

    next();
  } catch (e) {
    next(e);
  }
};

export const editProjectMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectService = container.get<IProjectService>(TYPES.IProjectService);
    let isProjectNameValid = false;
    const projectEditRequest: EditProjectRequest = req.body as EditProjectRequest;
    const result = ProjectValidation.createProjectSchema.safeParse(projectEditRequest);
    let isError = false;
    let error: {
      [x: string]: string[] | undefined;
      [x: number]: string[] | undefined;
      [x: symbol]: string[] | undefined;
    } = {};

    if (!result.success) {
      error = result.error.formErrors.fieldErrors;
      isError = true;
    }

    const project = await projectService.getProjectById(projectEditRequest.id);

    if (project.name === projectEditRequest.name && project.team.id === Number(projectEditRequest.teamId)) {
      isProjectNameValid = true;
    }

    if (!isProjectNameValid) {
      const isProjectExist = await projectService.checkProjectIsExistByTeamId(
        projectEditRequest.name,
        projectEditRequest.teamId
      );

      if (isProjectExist) {
        error["name"] = ["Nama Project Sudah Terdaftar"];
        isError = true;
      } else {
        isProjectNameValid = true;
      }
    }

    if (isError) {
      const teams = await projectService.getAllTeams();
      const tools = await projectService.getAllTools();

      return res.status(400).render("page/project-edit-admin", {
        activeMenu: "Teams",
        originalProjectName: project.name,
        originalTeamId: project.team.id,
        tools: tools,
        teams: teams,
        currentProjectId: projectEditRequest.id,
        currentProjectName: projectEditRequest.name,
        currentToolId: projectEditRequest.toolId,
        currentTeamId: projectEditRequest.teamId,
        errorData: error,
      });
    }

    next();
  } catch (e) {
    next(e);
  }
};

export const editProjectDashboardMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectDashboardEditRequest: ProjectDashboardEditRequest = req.body as ProjectDashboardEditRequest;
    const result = ProjectValidation.editProjectDashboardSchema.safeParse(projectDashboardEditRequest);
    let error: {
      [x: string]: string[] | undefined;
      [x: number]: string[] | undefined;
      [x: symbol]: string[] | undefined;
    } = {};

    if (!result.success) {
      error = result.error.formErrors.fieldErrors;
      return res.status(400).render("page/project-edit-dashboard", {
        activeMenu: "Projects",
        project: {
          teamId: projectDashboardEditRequest.teamId,
          name: projectDashboardEditRequest.projectName,
        },
        dashboardData: projectDashboardEditRequest,
        errorData: error,
      });
    }

    next();
  } catch (e) {
    next(e);
  }
};

export const addModuleMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const moduleService = container.get<IModuleService>(TYPES.IModuleService);
    const moduleRequest: CreateModuleRequest = req.body as CreateModuleRequest;
    const result = ProjectValidation.createProjectModuleSchema.safeParse(moduleRequest.moduleName);
    let isError: boolean = false;
    let moduleNameError: string = "";

    if (!result.success) {
      isError = true;
      moduleNameError = result.error.formErrors.formErrors[0];
    } else {
      const isModuleExist = await moduleService.checkModuleIsExist(moduleRequest.moduleName, moduleRequest.id);

      if (isModuleExist) {
        moduleNameError = "Module Sudah Terdaftar";
        isError = true;
      }
    }

    if (isError) {
      return res.status(400).render("page/project-add-modules", {
        activeMenu: "Projects",
        project: {
          id: moduleRequest.id,
          team: {
            id: moduleRequest.teamId,
          },
          name: moduleRequest.projectName,
        },
        moduleName: moduleRequest.moduleName,
        moduleNameError: moduleNameError,
      });
    }

    next();
  } catch (e) {
    next(e);
  }
};
