export interface IStatusRepository {
  getStatusId(statusName: string): Promise<{ id: number }>;
}
