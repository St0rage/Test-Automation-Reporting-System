import { inject, injectable } from "inversify";
import { IModuleService } from "../interface/service/service-interface";
import { TYPES } from "../di/types";
import { IModuleRepository } from "../interface/repository/repository-interface";
import { CreateModuleRequest, ModuleResponse } from "../model/model";

@injectable()
export class ModuleService implements IModuleService {
  constructor(@inject(TYPES.IModuleRepository) private moduleRepository: IModuleRepository) {}

  async createModule(moduleRequest: CreateModuleRequest): Promise<void> {
    return this.moduleRepository.createModule(moduleRequest);
  }

  async checkModuleIsExist(moduleName: string, projectId: number): Promise<boolean> {
    return this.moduleRepository.checkModuleIsExist(moduleName, projectId);
  }

  async getModulesByProjectId(projectId: number): Promise<ModuleResponse[]> {
    return this.moduleRepository.getModulesByProjectId(projectId);
  }
}
