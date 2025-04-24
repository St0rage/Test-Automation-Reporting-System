import { Router } from "express";
import methodOverride from "method-override";
import { container } from "../di/inversify.config";
import { AdminController } from "../controller/admin-controller";
import {
  addMemberViewMiddleware,
  addTeamMiddleware,
  addToolMiddleware,
  addUserMiddleware,
  ediTeamMiddleware,
  teamUrlValidationMiddleware,
  editUserMiddleware,
  teamMemberViewMiddleware,
  teamViewMiddleware,
  toolViewMiddleware,
  userUrlValidationMiddleware,
  userViewMiddleware,
  toolUrlValidationMiddleware,
} from "../middleware/admin-middleware";

const adminController = container.get<AdminController>(AdminController);

export const adminRoute = Router();

adminRoute.use(methodOverride("_method"));

adminRoute.get("/", adminController.getDashboardData.bind(adminController));

adminRoute.get("/users", userViewMiddleware, adminController.usersView.bind(adminController));
adminRoute.get("/users/add-user", adminController.addUserView.bind(adminController));
adminRoute.post("/users/add-user", addUserMiddleware, adminController.addUser.bind(adminController));
adminRoute.patch("/users/reset-password", adminController.resetUserPassword.bind(adminController));
adminRoute.delete("/users/delete", adminController.deleteUser.bind(adminController));
adminRoute.get(
  "/users/edit-user/:username",
  userUrlValidationMiddleware,
  adminController.editUserView.bind(adminController)
);
adminRoute.patch(
  "/users/edit-user/:username",
  userUrlValidationMiddleware,
  editUserMiddleware,
  adminController.editUser.bind(adminController)
);
adminRoute.get("/users/:username", userUrlValidationMiddleware, adminController.userDetailView.bind(adminController));

adminRoute.get("/teams", teamViewMiddleware, adminController.teamsView.bind(adminController));
adminRoute.get("/teams/add-team", adminController.addTeamView.bind(adminController));
adminRoute.post("/teams/add-team", addTeamMiddleware, adminController.addTeam.bind(adminController));
adminRoute.delete("/teams/delete", adminController.deleteTeam.bind(adminController));
adminRoute.get(
  "/teams/edit-team/:teamName",
  teamUrlValidationMiddleware,
  adminController.editTeamView.bind(adminController)
);
adminRoute.patch(
  "/teams/edit-team/:teamName",
  teamUrlValidationMiddleware,
  ediTeamMiddleware,
  adminController.editTeam.bind(adminController)
);
adminRoute.get(
  "/teams/team-member/:teamName",
  teamUrlValidationMiddleware,
  teamMemberViewMiddleware,
  adminController.teamMemberView.bind(adminController)
);
adminRoute.get(
  "/teams/team-member/:teamName/add-member",
  teamUrlValidationMiddleware,
  addMemberViewMiddleware,
  adminController.addTeamMemberView.bind(adminController)
);
adminRoute.post(
  "/teams/team-member/:teamName/add-member",
  teamUrlValidationMiddleware,
  adminController.addTeamMember.bind(adminController)
);
adminRoute.patch(
  "/teams/team-member/:teamName/edit-member",
  teamUrlValidationMiddleware,
  adminController.editTeamMember.bind(adminController)
);
adminRoute.delete(
  "/teams/team-member/:teamName/delete-member",
  teamUrlValidationMiddleware,
  adminController.deleteTeamMember.bind(adminController)
);

adminRoute.get("/projects", adminController.projectsView.bind(adminController));

adminRoute.get("/tools", toolViewMiddleware, adminController.toolsView.bind(adminController));
adminRoute.get("/tools/add-tool", adminController.addToolView.bind(adminController));
adminRoute.post("/tools/add-tool", addToolMiddleware, adminController.addTool.bind(adminController));
adminRoute.get(
  "/tools/edit-tool/:toolName",
  toolUrlValidationMiddleware,
  adminController.editToolView.bind(adminController)
);
