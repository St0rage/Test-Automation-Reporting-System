export interface IToolRepository {
  createOrGetToolId(toolName: string): Promise<number>;
}
