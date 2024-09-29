import { NextFunction, Request, Response } from "express";
import { container } from "../di/inversify.config";
import { TYPES } from "../di/types";
import { ResponseError } from "../error/response-error";
import { IFileRecordRepository } from "../interface/repository/file-record-repository-interface";
import { IProjectRepository } from "../interface/repository/project-repository-interface";
import { IScenarioRepository } from "../interface/repository/scenario-repository-interface";
import moment from "moment";

export const reportPathValidateMiddleware = async (
  req: Request,
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

    // const isProjectExist = await projectRepository.checkProjectIsExist(
    //   projectName.toUpperCase()
    // );

    const projectId = await projectRepository.getProjectIdByProjectName(
      projectName.toUpperCase()
    );

    if (!projectId) {
      throw new ResponseError(404, "Not Found");
    }

    // const isScenarioExist = await scenarioRepository.checkScenarioIsExist(
    //   scenarioName.toUpperCase(),
    //   projectId.id
    // );

    const scenarioId =
      await scenarioRepository.getScenarioIdByScenarioNameAndProjectId(
        scenarioName.toUpperCase(),
        projectId.id
      );

    if (!scenarioId) {
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

    const testCase = req.query.test_case;
    const date = req.query.date as string;

    if (testCase === "" && date === "") {
      return res.redirect(`/${projectName}/${scenarioName}?page=1`);
    }

    if (testCase && date === "") {
      return res.redirect(
        `/${projectName}/${scenarioName}?page=1&test_case=${testCase}`
      );
    }

    if (date && testCase === "") {
      const isValidMonth = moment(date, "DD/MM/YYYY", true).isValid();

      if (!isValidMonth) {
        return res.redirect(`/${projectName}/${scenarioName}?page=1`);
      }

      return res.redirect(
        `/${projectName}/${scenarioName}?page=1&date=${encodeURIComponent(
          date
        )}`
      );
    }

    if (testCase && date) {
      const isValidMonth = moment(date, "DD/MM/YYYY", true).isValid();

      if (!isValidMonth) {
        return res.redirect(
          `/${projectName}/${scenarioName}?page=1&test_case=${testCase}`
        );
      }
    }

    res.locals.projectName = projectName.toUpperCase();
    res.locals.scenarioName = scenarioName.toUpperCase();
    res.locals.testCase = testCase;
    res.locals.date = date;
    res.locals.scenarioId = scenarioId.id;

    next();
  } catch (e) {
    next(e);
  }
};

export const downloadMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    const fileRecordRepository = container.get<IFileRecordRepository>(
      TYPES.IFileRecordRepository
    );

    const fileName = await fileRecordRepository.checkFileRecordIsExist(
      parseInt(id)
    );

    if (!fileName) {
      throw new ResponseError(404, "Not Found");
    }

    res.locals.fileName = fileName;

    next();
  } catch (e) {
    next(e);
  }
};

export const deleteFileRecordMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { fileRecordId } = req.params;

    const fileRecordRepository = container.get<IFileRecordRepository>(
      TYPES.IFileRecordRepository
    );

    const fileName = await fileRecordRepository.checkFileRecordIsExist(
      parseInt(fileRecordId)
    );

    if (!fileName) {
      throw new ResponseError(404, "Not Found");
    }

    res.locals.fileRecordId = parseInt(fileRecordId);

    next();
  } catch (e) {
    next(e);
  }
};
