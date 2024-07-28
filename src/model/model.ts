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

export type IdAndName = {
  id: number;
  name: string;
};

export type ReportDetailRequest = {
  report_id: number;
  title: string;
  description: string;
  result: string;
  image: string;
};

export type ReportDetailInsertRequest = {
  report_id: number;
  status_id: number;
  title: string;
  description: string;
  image: string;
};

export type FileRecordResponse = {
  id: number;
  file_name: string;
  created_time: number;
  test_case: {
    name: string;
  };
  status: {
    name: string;
  };
};

export type ProjectScenarioResponse = {
  id: number;
  name: string;
  scenarios: {
    name: string;
  }[];
};
