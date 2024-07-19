import { NextFunction, Response } from "express";
import { exRequest } from "../type/exrequest";
import { container } from "../di/inversify.config";
import { IProjectRepository } from "../interface/repository/project-repository-interface";
import { TYPES } from "../di/types";
import { IScenarioRepository } from "../interface/repository/scenario-repository-interface";
import { ResponseError } from "../error/response-error";
import { IFileRecord } from "../interface/repository/file-record-repository-interface";

export const reportPathValidateMiddleware = async (
  req: exRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { projectName, scenarioName } = req.params;
    const projectRepository = container.get<IProjectRepository>(
      TYPES.IProjectRepository
    );
    const scenarioRepository = container.get<IScenarioRepository>(
      TYPES.IScenarioRepository
    );

    const isProjectExist = await projectRepository.checkProjectIsExist(
      projectName.toUpperCase()
    );

    if (!isProjectExist) {
      throw new ResponseError(404, "Not Found");
    }

    const isScenarioExist = await scenarioRepository.checkScenarioIsExist(
      scenarioName.toUpperCase()
    );

    if (!isScenarioExist) {
      throw new ResponseError(404, "Not Found");
    }

    const page = req.query.page;

    if (!page) {
      return res.redirect(`/${projectName}/${scenarioName}?page=1`);
    }

    const pageNumber = parseInt(page as string);

    if (pageNumber < 1) {
      return res.redirect(`/${projectName}/${scenarioName}?page=1`);
    }

    req.projectName = projectName.toUpperCase();
    req.scenarioName = scenarioName.toUpperCase();

    next();
  } catch (e) {
    next(e);
  }
};

export const downloadMiddleware = async (
  req: exRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    const fileRecordRepository = container.get<IFileRecord>(TYPES.IFileRecord);

    const fileName = await fileRecordRepository.checkFileRecordIsExist(
      parseInt(id)
    );

    if (!fileName) {
      throw new ResponseError(404, "Not Found");
    }

    req.fileName = fileName;

    next();
  } catch (e) {
    next(e);
  }
};
