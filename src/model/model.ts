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

export type ImageDetailRequest = {
  report_id: number;
  image: string;
};

export type ImageDetailInsertRequest = {
  report_id: number;
  step_number: number | null;
  image: string;
};

export type ReportDetailRequest = {
  report_id: number;
  detail_id: number;
  title: string;
  description: string;
  status: number;
};

export type ReportDetailInsertRequest = {
  report_id: number;
  detail_id: number;
  status_id: number;
  title: string;
  description: string;
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
    id: number;
    name: string;
  };
  test_case: {
    id: number;
    name: string;
  };
  tool: {
    name: string;
  };
};

export type ReportDetailResponse = {
  step_number: number | null;
  title: string | null;
  description: string | null;
  image: string;
  status: {
    name: string;
  } | null;
};

export type ReportDetailResponseWithId = {
  id: number;
  step_number: number | null;
  title: string | null;
  description: string | null;
  image: string;
  status: {
    name: string;
  } | null;
};

export type FileRecordRequest = {
  scenario_id: number;
  test_case_id: number;
  status_id: number;
  file_name: string;
  created_time: number;
};
