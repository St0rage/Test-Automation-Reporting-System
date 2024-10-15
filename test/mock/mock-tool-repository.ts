import { injectable } from "inversify";
import { IToolRepository } from "../../src/interface/repository/tool-repository-interface";

@injectable()
export class MockToolRepository implements IToolRepository {
  private tools: { id: number; name: string }[] = [];

  async createOrGetToolId(toolName: string): Promise<number> {
    const tool = this.tools.find((value) => value.name === toolName);

    if (tool) {
      return tool.id;
    }

    return 1;
  }
}
