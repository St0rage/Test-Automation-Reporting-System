import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import { IAdminService } from "../interface/service/service-interface";
import { CreateUserRequest, EditUserRequest } from "../model/model";

@injectable()
export class AdminController {
  constructor(@inject(TYPES.IAdminService) private adminService: IAdminService) {}

  async getDashboardData(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).render("page/dashboard-admin", {
        activeMenu: "Dashboard",
      });
    } catch (e) {
      next(e);
    }
  }

  async usersView(req: Request, res: Response, next: NextFunction) {
    try {
      const pageNumber: number = parseInt(req.query.page as string);
      const search = req.query.search as string | undefined;

      const userAlert = req.flash("user-alert");

      const users = await this.adminService.getUsers(pageNumber, search);
      const totalUsers = await this.adminService.getTotalUsers(search);

      res.status(200).render("page/users", {
        activeMenu: "Users",
        users: users,
        userAlert: userAlert,
        page: pageNumber,
        totalUsers: totalUsers,
        searchQuery: search,
      });
    } catch (e) {
      next(e);
    }
  }

  async addUserView(req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await this.adminService.getRoles();

      res.status(200).render("page/user-registration", {
        activeMenu: "Users",
        roles: roles,
        selectedRole: roles.find((value) => value.name === "USER")?.id,
        errorData: {
          name: undefined,
          username: undefined,
        },
      });
    } catch (e) {
      next(e);
    }
  }

  async addUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userRequest: CreateUserRequest = req.body as CreateUserRequest;

      await this.adminService.createUser(userRequest);

      req.flash("user-alert", "Berhasil Menambahkan User");
      return res.status(200).redirect("/users");
    } catch (e) {
      next(e);
    }
  }

  async resetUserPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: string = req.body.id;
      const page: string = req.body.page;
      const searchQuery: string = req.body.searchQuery;

      await this.adminService.resetUserPassword(parseInt(userId));

      req.flash("user-alert", "Berhasil Reset Password");
      return res.status(200).redirect(`/users?page=${page}${searchQuery ? "&search=" + searchQuery : ""}`);
    } catch (e) {
      next(e);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: number = parseInt(req.body.id);
      const page: string = req.body.page;
      const searchQuery: string = req.body.searchQuery;

      await this.adminService.deleteUser(userId);
      req.flash("user-alert", "Berhasil Delete User");
      return res.status(200).redirect(`/users?page=${page}${searchQuery ? "&search=" + searchQuery : ""}`);
    } catch (e) {
      next(e);
    }
  }

  async editUserView(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.params;
      const roles = await this.adminService.getRoles();
      const user = await this.adminService.getUserByUsername(username);

      res.status(200).render("page/user-edit", {
        activeMenu: "Users",
        roles: roles,
        selectedRole: roles.find((value) => value.name === user.roles.name)?.id,
        originalUsername: user.username,
        currentUserId: user.id,
        currentUsername: user.username,
        currentName: user.name,
        errorData: {
          name: undefined,
          username: undefined,
        },
      });
    } catch (e) {
      next(e);
    }
  }

  async editUser(req: Request, res: Response, next: NextFunction) {
    try {
      const editUserRequest = req.body as EditUserRequest;
      await this.adminService.editUser(editUserRequest);
      req.flash("user-alert", "Berhasil Mengubah User");
      return res.status(200).redirect("/users");
    } catch (e) {
      next(e);
    }
  }

  async teamsView(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).render("page/teams", {
        activeMenu: "Teams",
      });
    } catch (e) {
      next(e);
    }
  }

  async projectsView(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).render("page/projects", {
        activeMenu: "Projects",
      });
    } catch (e) {
      next(e);
    }
  }

  async toolsView(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).render("page/tools", {
        activeMenu: "Tools",
      });
    } catch (e) {
      next(e);
    }
  }
}
