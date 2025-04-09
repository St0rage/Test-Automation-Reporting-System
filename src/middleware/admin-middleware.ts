import { NextFunction, Request, Response } from "express";
import { CreateUserRequest, EditUserRequest } from "../model/model";
import { UserValidation } from "../validation/user-validations";
import { container } from "../di/inversify.config";
import { IAdminService } from "../interface/service/service-interface";
import { TYPES } from "../di/types";
import { ResponseError } from "../error/response-error";

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

      return res.status(200).render("page/user-registration", {
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

export const editUserViewMiddleware = async (req: Request, res: Response, next: NextFunction) => {
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

      return res.status(200).render("page/user-edit", {
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
