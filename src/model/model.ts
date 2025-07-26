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

export type CreateUserRequest = {
  name: string;
  username: string;
  roleId: string;
};

export type CreateUserInsertRequest = {
  name: string;
  username: string;
  roleId: number;
  password: string;
  tempPassword: string;
  reset: boolean;
};

export type UserResponse = {
  id: number;
  name: string;
  username: string;
  tempPassword: string | null;
  reset: boolean;
  roles: {
    name: string;
  };
};

export type UserDetailResponse = {
  id: number;
  name: string;
  username: string;
  tempPassword: string | null;
  reset: boolean;
  roles: {
    name: string;
  };
  userTeams: {
    leader: boolean;
    team: {
      name: string;
    };
  }[];
};

export type UserMemberResponse = {
  id: number;
  username: string;
  name: string;
};

export type EditUserRequest = {
  id: number;
  name: string;
  username: string;
  roleId: string;
};

export type UserTeamRequest = {
  userId: number;
  teamId: number;
  leader: boolean;
};

export type UserTeamResponse = {
  id: number;
  username: string;
  name: string;
  leader: boolean;
};

export type CreateProjectRequest = {
  name: string;
  teamId: number;
  toolId: number;
};

export type EditProjectRequest = {
  id: number;
  name: string;
  teamId: number;
  toolId: number;
};

export type ProjectResponse = {
  id: number;
  name: string;
  team: {
    id: number;
    name: string;
  };
};

export type ProjectResponseEdit = {
  id: number;
  name: string;
  team: {
    id: number;
    name: string;
  };
  tool: {
    id: number;
    name: string;
  };
};

export type ProjectDashboard = {
  id: number;
  name: string;
  manualModule: number | null;
  manualScenario: number | null;
  manualTestcase: number | null;
  possibleTestcase: number | null;
  team: {
    id: number;
    name: string;
  };
  tool: {
    name: string;
  };
};

export type ProjectDashboardEditRequest = {
  id: number;
  teamId: number;
  projectName: string;
  manualModule: number;
  manualScenario: number;
  manualTestcase: number;
  possibleTestcase: number;
};

export type ProjectAdditional = {
  id: number;
  name: string;
  repository: string | null;
  jira: string | null;
  externalRsc: string | null;
  testScript: string | null;
  team: {
    id: number;
  };
};

export type ProjectAdditionalEditRequest = {
  id: number;
  teamId: number;
  projectName: string;
  repository: string;
  jira: string;
  externalRsc: string;
  testScript: string;
};

export type CreateModuleRequest = {
  id: number;
  teamId: number;
  projectName: string;
  moduleName: string;
};

export type ModuleResponse = {
  id: number;
  name: string;
  totalScenarios: number;
  totalTestCases: number;
};
