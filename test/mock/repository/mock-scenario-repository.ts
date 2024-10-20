import { injectable } from "inversify";
import { IScenarioRepository } from "../../../src/interface/repository/scenario-repository-interface";
import { IdAndName } from "../../../src/model/model";

@injectable()
export class MockScenarioRepository implements IScenarioRepository {
  private scenarios: { id: number; projectId: number; name: string }[] = [];

  async createOrGetScenarioIdAndName(
    scenarioName: string,
    projectId: number
  ): Promise<IdAndName> {
    const scenario = this.scenarios.find(
      (value) => value.name === scenarioName && value.projectId === projectId
    );

    if (scenario) {
      return { id: scenario.id, name: scenario.name } as IdAndName;
    }

    return { id: 1, name: scenarioName } as IdAndName;
  }

  async getScenarioIdByScenarioNameAndProjectId(
    scenarioName: string,
    projectId: number
  ): Promise<{ id: number } | null> {
    const scenario = this.scenarios.find(
      (value) => value.name === scenarioName && value.projectId === projectId
    );

    if (!scenario) {
      return null;
    }

    return { id: scenario.id };
  }

  setScenarios(scenarios: { id: number; projectId: number; name: string }[]) {
    this.scenarios = scenarios;
  }
}
