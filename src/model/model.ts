export type ReportRequest = {
  project: {
    name: string;
    platform: string;
    tool: string;
  };
  scenario: string;
  test_case: {
    name: string;
    unique_id: string;
    expected_result: string;
    criteria: string;
    description: string;
  };
  report: {
    activity: string;
    author: string;
  };
};

export type ProjectInsertRequest = {
  tool_id: number;
  name: string;
  platform: string;
};

export type TestCaseInsertRequest = {
  scenario_id: number;
  name: string;
  unique_id: string;
  expected_result: string;
  criteria: string;
  description: string;
};

export type ReportInsertRequest = {
  project_id: number;
  test_case_id: number;
  activity: string;
  author: string;
};

export type IdAndName = {
  id: number;
  name: string;
};

export type IdAndUniqueId = {
  id: number;
  unique_id: string;
};

export type SectionRequest = {
  report_id: number;
  name: string;
};

export type SectionInsertRequest = {
  report_id: number;
  section_number: number;
  name: string;
};

export type SectionResponse = {
  id: number;
  name: string;
  section_number: number;
};

export type ImageDetailRequest = {
  image: string;
};

export type ImageDetailInsertRequest = {
  section_id: number;
  step_number: number | null;
  image: string;
};

export type TestStepRequest = {
  test_step_id: number;
  title: string;
  description: string;
  status: number;
};

export type TestStepInsertRequest = {
  test_step_id: number;
  status_id: number;
  title: string;
  description: string;
};

export type FileRecordResponse = {
  id: number;
  file_name: string;
  created_time: number;
  test_case: {
    unique_id: string;
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
    platform: string;
    tool: {
      name: string;
    };
  };
  test_case: {
    id: number;
    name: string;
    unique_id: string;
    expected_result: string;
    criteria: string;
    description: string;
    scenario: {
      id: number;
      name: string;
    };
  };
};

export type SectionFullRespone = {
  section_number: number;
  name: string;
  test_steps: TestStepResponse[];
};

export type TestStepResponse = {
  step_number: number | null;
  title: string | null;
  description: string | null;
  image: string;
  status: {
    name: string;
  } | null;
};

export type TestStepResponseWithId = {
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
  test_case_id: number;
  status_id: number;
  file_name: string;
  created_time: number;
};
