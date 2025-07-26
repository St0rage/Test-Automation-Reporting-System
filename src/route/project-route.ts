import { Router } from "express";
import methodOverride from "method-override";
import { ProjectController } from "../controller/project-controller";
import { container } from "../di/inversify.config";
import {
  addModuleMiddleware,
  addProjectMiddleware,
  editProjectDashboardMiddleware,
  editProjectMiddleware,
  projectUrlValidationMiddleware,
  projectViewMiddleware,
} from "../middleware/project-middleware";

const projectController = container.get<ProjectController>(ProjectController);

export const projectRoute = Router();

projectRoute.use(methodOverride("_method"));

projectRoute.get("/projects", projectViewMiddleware, projectController.projectsView.bind(projectController));
projectRoute.get("/projects/add-project", projectController.addProjectView.bind(projectController));
projectRoute.post("/projects/add-project", addProjectMiddleware, projectController.addProject.bind(projectController));
projectRoute.get(
  "/projects/edit-project/:teamId/:projectName",
  projectUrlValidationMiddleware,
  projectController.editProjectView.bind(projectController)
);
projectRoute.patch(
  "/projects/edit-project/:teamId/:projectName",
  projectUrlValidationMiddleware,
  editProjectMiddleware,
  projectController.editProject.bind(projectController)
);
projectRoute.delete("/projects/delete", projectController.deleteProject.bind(projectController));
projectRoute.get(
  "/projects/:teamId/:projectName/dashboard",
  projectUrlValidationMiddleware,
  projectController.dashboardProjectView.bind(projectController)
);
projectRoute.get(
  "/projects/:teamId/:projectName/dashboard/edit",
  projectUrlValidationMiddleware,
  projectController.dashboardProjectEditView.bind(projectController)
);
projectRoute.patch(
  "/projects/:teamId/:projectName/dashboard/edit",
  projectUrlValidationMiddleware,
  editProjectDashboardMiddleware,
  projectController.dashboardProjectEdit.bind(projectController)
);
projectRoute.get(
  "/projects/:teamId/:projectName/modules",
  projectUrlValidationMiddleware,
  projectController.moduleProjectView.bind(projectController)
);
projectRoute.get(
  "/projects/:teamId/:projectName/modules/add-module",
  projectUrlValidationMiddleware,
  projectController.moduleProjectAddView.bind(projectController)
);
projectRoute.post(
  "/projects/:teamId/:projectName/modules/add-module",
  projectUrlValidationMiddleware,
  addModuleMiddleware,
  projectController.moduleProjectAdd.bind(projectController)
);

projectRoute.get(
  "/projects/:teamId/:projectName/additional",
  projectUrlValidationMiddleware,
  projectController.additionalProjectView.bind(projectController)
);
projectRoute.get(
  "/projects/:teamId/:projectName/additional/edit",
  projectUrlValidationMiddleware,
  projectController.additionalProjectEditView.bind(projectController)
);
projectRoute.patch(
  "/projects/:teamId/:projectName/additional/edit",
  projectUrlValidationMiddleware,
  projectController.additionalProjectEdit.bind(projectController)
);
