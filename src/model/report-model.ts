export type ReportRequest = {
  project: string;
  scenario: string;
  test_case: string;
  tool: string;
  author: string;
};

export type ReportInsertRequest = {
  project_id: number;
  scenario_id: number;
  test_case_id: number;
  tool_id: number;
  author: string;
};
