import { Router } from "express";
import methodOverride from "method-override";
import { container } from "../di/inversify.config";
import { AdminController } from "../controller/admin-controller";
import {
  addUserMiddleware,
  editUserMiddleware,
  editUserViewMiddleware,
  userViewMiddleware,
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
  editUserViewMiddleware,
  adminController.editUserView.bind(adminController)
);
adminRoute.patch(
  "/users/edit-user/:username",
  editUserViewMiddleware,
  editUserMiddleware,
  adminController.editUser.bind(adminController)
);

adminRoute.get("/teams", adminController.teamsView.bind(adminController));

adminRoute.get("/projects", adminController.projectsView.bind(adminController));

adminRoute.get("/tools", adminController.toolsView.bind(adminController));
