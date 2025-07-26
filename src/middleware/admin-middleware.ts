import { NextFunction, Request, Response } from "express";
import { CreateUserRequest, EditUserRequest, IdAndName } from "../model/model";
import { UserValidation } from "../validation/user-validation";
import { container } from "../di/inversify.config";
import { IAdminService } from "../interface/service/service-interface";
import { TYPES } from "../di/types";
import { ResponseError } from "../error/response-error";
import { TeamValidation } from "../validation/team-validation";
import { ToolValidation } from "../validation/tool-validation";

export const addUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adminService = container.get<IAdminService>(TYPES.IAdminService);
    const userRequest: CreateUserRequest = req.body as CreateUserRequest;
    const result = UserValidation.createUserSchema.safeParse(userRequest);
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

    const isUsernameExist = await adminService.checkUsernameIsExist(userRequest.username);

    if (isUsernameExist) {
      error["username"] = ["Username Sudah Terdaftar"];
      isError = true;
    }

    if (isError) {
      const roles = await adminService.getRoles();

      return res.status(400).render("page/user-registration", {
        activeMenu: "Users",
        roles: roles,
        selectedRole: roles.find((value) => value.id === parseInt(userRequest.roleId))?.id,
        formData: userRequest,
        errorData: error,
      });
    }

    next();
  } catch (e) {
    next(e);
  }
};

export const userViewMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = req.query.page;
    const search = req.query.search;

    if (!page || parseInt(page as string) < 1 || search === "") {
      return res.redirect("/users?page=1");
    }

    next();
  } catch (e) {
    next(e);
  }
};

export const userUrlValidationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adminService = container.get<IAdminService>(TYPES.IAdminService);
    const { username } = req.params;

    const isUsernameExist = await adminService.checkUsernameIsExist(username);

    if (!isUsernameExist) {
      throw new ResponseError(404, "Not Found");
    }

    next();
  } catch (e) {
    next(e);
  }
};

export const editUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adminService = container.get<IAdminService>(TYPES.IAdminService);
    let isUsernameValid = false;
    const editUserRequest = req.body as EditUserRequest;
    const result = UserValidation.createUserSchema.safeParse(editUserRequest);
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

    const user = await adminService.getUserById(editUserRequest.id);

    if (user.username === editUserRequest.username) {
      isUsernameValid = true;
    }

    if (!isUsernameValid) {
      const isUsernameExist = await adminService.checkUsernameIsExist(editUserRequest.username);

      if (isUsernameExist) {
        error["username"] = ["Username Sudah Terdaftar"];
        isError = true;
      } else {
        isUsernameValid = true;
      }
    }

    if (isError) {
      const roles = await adminService.getRoles();

      return res.status(400).render("page/user-edit", {
        activeMenu: "Users",
        roles: roles,
        selectedRole: roles.find((value) => value.id === parseInt(editUserRequest.roleId))?.id,
        originalUsername: user.username,
        currentUserId: editUserRequest.id,
        currentUsername: editUserRequest.username,
        currentName: editUserRequest.name,
        errorData: error,
      });
    }

    next();
  } catch (e) {
    next(e);
  }
};

export const addTeamMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adminService = container.get<IAdminService>(TYPES.IAdminService);
    const teamName: string = req.body.teamName;
    const result = TeamValidation.createTeamSchema.safeParse(teamName);
    let isError: boolean = false;
    let teamNameError: string = "";

    if (!result.success) {
      isError = true;
      teamNameError = result.error.formErrors.formErrors[0];
    } else {
      const isTeamExist = await adminService.checkTeamIsExist(teamName);

      if (isTeamExist) {
        teamNameError = "Nama Team Sudah Terdaftar";
        isError = true;
      } else {
        isError = false;
      }
    }

    if (isError) {
      return res.status(400).render("page/team-registration", {
        activeMenu: "Teams",
        teamName: teamName,
        teamNameError: teamNameError,
      });
    }

    next();
  } catch (e) {
    next(e);
  }
};

export const teamViewMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = req.query.page;
    const search = req.query.search;

    if (!page || parseInt(page as string) < 1 || search === "") {
      return res.redirect("/teams?page=1");
    }

    next();
  } catch (e) {
    next(e);
  }
};

export const teamUrlValidationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adminService = container.get<IAdminService>(TYPES.IAdminService);
    const { teamName } = req.params;

    const isTeamNameExist = await adminService.checkTeamIsExist(teamName);

    if (!isTeamNameExist) {
      throw new ResponseError(404, "Not Found");
    }

    next();
  } catch (e) {
    next(e);
  }
};

export const ediTeamMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adminService = container.get<IAdminService>(TYPES.IAdminService);
    let isTeamNameValid = false;
    const currentTeamId: string = req.body.id;
    const currentTeamName: string = req.body.teamName;
    const result = TeamValidation.createTeamSchema.safeParse(currentTeamName);
    let isError: boolean = false;
    let teamNameError: string = "";
    const team: IdAndName = await adminService.getTeamById(parseInt(currentTeamId));

    if (!result.success) {
      isError = true;
      teamNameError = result.error.formErrors.formErrors[0];
    } else {
      if (team.name === currentTeamName) {
        isTeamNameValid = true;
      }

      if (!isTeamNameValid) {
        const isTeamExist = await adminService.checkTeamIsExist(currentTeamName);
        if (isTeamExist) {
          teamNameError = "Nama Team Sudah Terdaftar";
          isError = true;
        } else {
          isError = false;
        }
      }
    }

    if (isError) {
      return res.status(400).render("page/team-edit", {
        activeMenu: "Teams",
        originalTeamName: team.name,
        currentTeamId: currentTeamId,
        currentTeamName: currentTeamName,
        teamNameError: teamNameError,
      });
    }

    next();
  } catch (e) {
    next(e);
  }
};

export const teamMemberViewMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = req.query.page;
    const search = req.query.search;
    const { teamName } = req.params;

    if (!page || parseInt(page as string) < 1 || search === "") {
      return res.redirect(`/teams/team-member/${teamName}?page=1`);
    }

    next();
  } catch (e) {
    next(e);
  }
};

export const addMemberViewMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = req.query.page;
    const search = req.query.search;
    const { teamName } = req.params;

    if (!page || parseInt(page as string) < 1 || search === "") {
      return res.redirect(`/teams/team-member/${teamName}/add-member?page=1`);
    }

    next();
  } catch (e) {
    next(e);
  }
};

export const addToolMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adminService = container.get<IAdminService>(TYPES.IAdminService);
    const toolName: string = req.body.toolName;
    const result = ToolValidation.createToolSchema.safeParse(toolName);
    let isError: boolean = false;
    let toolNameError: string = "";

    if (!result.success) {
      isError = true;
      toolNameError = result.error.formErrors.formErrors[0];
    } else {
      const isToolExist = await adminService.checkToolNameIsExist(toolName);

      if (isToolExist) {
        toolNameError = "Nama Tool Sudah Terdaftar";
        isError = true;
      } else {
        isError = false;
      }
    }

    if (isError) {
      return res.status(400).render("page/tool-registration", {
        activeMenu: "Teams",
        toolName: toolName,
        toolNameError: toolNameError,
      });
    }

    next();
  } catch (e) {
    next(e);
  }
};

export const toolViewMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = req.query.page;
    const search = req.query.search;

    if (!page || parseInt(page as string) < 1 || search === "") {
      return res.redirect("/tools?page=1");
    }

    next();
  } catch (e) {
    next(e);
  }
};

export const toolUrlValidationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adminService = container.get<IAdminService>(TYPES.IAdminService);
    const { toolName } = req.params;

    const isToolNameExist = await adminService.checkToolNameIsExist(toolName);

    if (!isToolNameExist) {
      throw new ResponseError(404, "Not Found");
    }

    next();
  } catch (e) {
    next(e);
  }
};

export const editToolMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adminService = container.get<IAdminService>(TYPES.IAdminService);
    let isToolNameValid = false;
    const currentToolId: string = req.body.id;
    const currentToolName: string = req.body.toolName;
    const result = ToolValidation.createToolSchema.safeParse(currentToolName);
    let isError: boolean = false;
    let toolNameError: string = "";
    const tool: IdAndName = await adminService.getToolById(parseInt(currentToolId));

    if (!result.success) {
      isError = true;
      toolNameError = result.error.formErrors.formErrors[0];
    } else {
      if (tool.name.toLowerCase() === currentToolName.toLowerCase()) {
        isToolNameValid = true;
      }

      if (!isToolNameValid) {
        const isTeamExist = await adminService.checkToolNameIsExist(currentToolName);
        if (isTeamExist) {
          toolNameError = "Nama Tool Sudah Terdaftar";
          isError = true;
        } else {
          isError = false;
        }
      }
    }

    if (isError) {
      return res.status(400).render("page/tool-edit", {
        activeMenu: "Teams",
        originalToolName: tool.name,
        currentToolId: currentToolId,
        currentToolName: currentToolName,
        toolNameError: toolNameError,
      });
    }

    next();
  } catch (e) {
    next(e);
  }
};
