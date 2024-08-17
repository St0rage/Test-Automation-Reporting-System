export type ReportRequest = {
  project: string;
  scenario: string;
  test_case: string;
  tool: string;
  activity: string;
  author: string;
};

export type ReportInsertRequest = {
  project_id: number;
  scenario_id: number;
  test_case_id: number;
  tool_id: number;
  activity: string;
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

export type ReportResponse = {
  activity: string;
  author: string;
  project: {
    name: string;
  };
  scenario: {
    name: string;
  };
  test_case: {
    name: string;
  };
  tool: {
    name: string;
  };
};

export type ReportDetailResponse = {
  title: string;
  description: string;
  image: string;
  status: {
    name: string;
  };
};
