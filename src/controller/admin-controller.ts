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

  async userDetailView(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.params;

      const user = await this.adminService.getUserDetailByUsername(username);

      res.status(200).render("page/user-detail", {
        activeMenu: "Users",
        user: user,
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
      const pageNumber: number = parseInt(req.query.page as string);
      const search = req.query.search as string | undefined;

      const teamAlert = req.flash("team-alert");

      const teams = await this.adminService.getTeams(pageNumber, search);
      const totalTeams = await this.adminService.getTotalTeams(search);

      res.status(200).render("page/teams", {
        activeMenu: "Teams",
        teams: teams,
        teamAlert: teamAlert,
        page: pageNumber,
        totalTeams: totalTeams,
        searchQuery: search,
      });
    } catch (e) {
      next(e);
    }
  }

  async addTeamView(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).render("page/team-registration", {
        activeMenu: "Teams",
        teamNameError: undefined,
      });
    } catch (e) {
      next(e);
    }
  }

  async addTeam(req: Request, res: Response, next: NextFunction) {
    try {
      const teamName: string = req.body.teamName;

      await this.adminService.createTeam(teamName);

      req.flash("team-alert", "Berhasil Menambahkan Team");
      return res.status(200).redirect("/teams");
    } catch (e) {
      next(e);
    }
  }

  async deleteTeam(req: Request, res: Response, next: NextFunction) {
    try {
      const teamId: number = parseInt(req.body.id);
      const page: string = req.body.page;
      const searchQuery: string = req.body.searchQuery;

      await this.adminService.deleteTeam(teamId);
      req.flash("team-alert", "Berhasil Delete Team");
      return res.status(200).redirect(`/teams?page=${page}${searchQuery ? "&search=" + searchQuery : ""}`);
    } catch (e) {
      next(e);
    }
  }

  async editTeamView(req: Request, res: Response, next: NextFunction) {
    try {
      const { teamName } = req.params;

      const team = await this.adminService.getTeamByName(teamName);

      res.status(200).render("page/team-edit", {
        activeMenu: "Teams",
        originalTeamName: team.name,
        currentTeamId: team.id,
        currentTeamName: team.name,
        teamNameError: undefined,
      });
    } catch (e) {
      next(e);
    }
  }

  async editTeam(req: Request, res: Response, next: NextFunction) {
    try {
      const teamId: string = req.body.id;
      const teamName: string = req.body.teamName;

      await this.adminService.editTeam(parseInt(teamId), teamName);

      req.flash("team-alert", "Berhasil Mengubah Team");
      return res.status(200).redirect("/teams");
    } catch (e) {
      next(e);
    }
  }

  async teamMemberView(req: Request, res: Response, next: NextFunction) {
    try {
      const { teamName } = req.params;
      const pageNumber: number = parseInt(req.query.page as string);
      const search = req.query.search as string | undefined;

      const teamAlert = req.flash("team-alert");

      const users = await this.adminService.getUsersTeam(teamName, pageNumber, search);
      const totalUsers = await this.adminService.getTotalUsersTeam(teamName, search);

      res.status(200).render("page/teams-member", {
        activeMenu: "Teams",
        originalTeamName: teamName,
        teamAlert: teamAlert,
        users: users,
        totalUsers: totalUsers,
        page: pageNumber,
        searchQuery: search,
      });
    } catch (e) {
      next(e);
    }
  }

  async addTeamMemberView(req: Request, res: Response, next: NextFunction) {
    try {
      const { teamName } = req.params;
      const pageNumber: number = parseInt(req.query.page as string);
      const search = req.query.search as string | undefined;

      // const team = await this.adminService.getTeamByName(teamName);
      const users = await this.adminService.getUserMembers(teamName, pageNumber, search);
      const totalUsers = await this.adminService.getTotalUserMembers(teamName, search);

      res.status(200).render("page/teams-member-registration", {
        activeMenu: "Teams",
        originalTeamName: teamName,
        page: pageNumber,
        users: users,
        totalUsers: totalUsers,
        searchQuery: search,
      });
    } catch (e) {
      next(e);
    }
  }

  async addTeamMember(req: Request, res: Response, next: NextFunction) {
    try {
      const { teamName } = req.params;
      const userId = req.body.userId as number;
      const leader = req.body.teamLeader as boolean;

      await this.adminService.createUserTeam(teamName, userId, leader);
      req.flash("team-alert", "Berhasil Menambah Team Member");
      return res.status(200).redirect(`/teams/team-member/${teamName}`);
    } catch (e) {
      next(e);
    }
  }

  async editTeamMember(req: Request, res: Response, next: NextFunction) {
    try {
      const { teamName } = req.params;
      const userId = req.body.userId as number;
      const leader = req.body.teamLeader as boolean;

      await this.adminService.editUserTeam(teamName, userId, leader);
      req.flash("team-alert", "Berhasil Mengubah Team Member");
      return res.status(200).redirect(`/teams/team-member/${teamName}`);
    } catch (e) {
      next(e);
    }
  }

  async deleteTeamMember(req: Request, res: Response, next: NextFunction) {
    try {
      const { teamName } = req.params;
      const userId = req.body.userId as number;
      const page = req.body.page;
      const searchQuery = req.body.searchQuery;

      await this.adminService.deleteUserTeam(teamName, userId);
      req.flash("team-alert", "Berhasil Menghapus Team Member");
      return res
        .status(200)
        .redirect(`/teams/team-member/${teamName}?page=${page}${searchQuery ? "&search=" + searchQuery : ""}`);
    } catch (e) {
      next(e);
    }
  }

  async toolsView(req: Request, res: Response, next: NextFunction) {
    try {
      const pageNumber: number = parseInt(req.query.page as string);
      const search = req.query.search as string | undefined;

      const toolAlert = req.flash("tool-alert");

      const tools = await this.adminService.getTools(pageNumber, search);
      const totalTools = await this.adminService.getTotalTools(search);

      res.status(200).render("page/tools", {
        activeMenu: "Tools",
        tools: tools,
        toolAlert: toolAlert,
        page: pageNumber,
        searchQuery: search,
        totalTools: totalTools,
      });
    } catch (e) {
      next(e);
    }
  }

  async addToolView(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).render("page/tool-registration", {
        activeMenu: "Tools",
        toolNameError: undefined,
      });
    } catch (e) {
      next(e);
    }
  }

  async addTool(req: Request, res: Response, next: NextFunction) {
    try {
      const toolName: string = req.body.toolName;

      await this.adminService.createTool(toolName);

      req.flash("tool-alert", "Berhasil Menambahkan Tool");
      return res.status(200).redirect("/tools");
    } catch (e) {
      next(e);
    }
  }

  async editToolView(req: Request, res: Response, next: NextFunction) {
    try {
      const { toolName } = req.params;

      const tool = await this.adminService.getToolByName(toolName);

      res.status(200).render("page/tool-edit", {
        activeMenu: "Tools",
        originalToolName: tool.name,
        currentToolId: tool.id,
        currentToolName: tool.name,
        toolNameError: undefined,
      });
    } catch (e) {
      next(e);
    }
  }

  async editTool(req: Request, res: Response, next: NextFunction) {
    try {
      const toolId: string = req.body.id;
      const toolName: string = req.body.toolName;

      await this.adminService.editTool(parseInt(toolId), toolName);

      req.flash("tool-alert", "Berhasil Mengubah Tool");
      return res.status(200).redirect("/tools");
    } catch (e) {
      next(e);
    }
  }

  async deleteTool(req: Request, res: Response, next: NextFunction) {
    try {
      const toolId: number = parseInt(req.body.id);
      const page: string = req.body.page;
      const searchQuery: string = req.body.searchQuery;

      const isDeleteSuccess = await this.adminService.deleteTool(toolId);

      isDeleteSuccess
        ? req.flash("tool-alert", "Berhasil Delete Tool")
        : req.flash("tool-alert", "Gagal Delete Tool, Terdapat Project Menggunakan Tool Ini");

      return res.status(200).redirect(`/tools?page=${page}${searchQuery ? "&search=" + searchQuery : ""}`);
    } catch (e) {
      next(e);
    }
  }
}
