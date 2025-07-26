import {
  CreateModuleRequest,
  CreateProjectRequest,
  CreateUserInsertRequest,
  EditProjectRequest,
  EditUserRequest,
  IdAndName,
  ModuleResponse,
  ProjectAdditional,
  ProjectAdditionalEditRequest,
  ProjectDashboard,
  ProjectDashboardEditRequest,
  ProjectResponse,
  ProjectResponseEdit,
  UserDetailResponse,
  UserMemberResponse,
  UserResponse,
  UserTeamRequest,
  UserTeamResponse,
} from "../../model/model";

export interface IUserRepository {
  getRoles(): Promise<IdAndName[]>;
  createUser(userRequest: CreateUserInsertRequest): Promise<void>;
  checkUsernameIsExist(username: string): Promise<boolean>;
  getUsers(page: number, search?: string): Promise<UserResponse[]>;
  countTotalUsers(search?: string): Promise<number>;
  resetPassword(id: number, hasPassword: string, tempPassword: string): Promise<void>;
  deleteUser(id: number): Promise<void>;
  getUserById(id: number): Promise<UserResponse | undefined>;
  getUserByUsername(username: string): Promise<UserResponse | undefined>;
  getUserDetailByUsername(username: string): Promise<UserDetailResponse | undefined>;
  updateUser(editUserRequest: EditUserRequest): Promise<void>;
  getUsersMember(teamName: string, page: number, search?: string): Promise<UserMemberResponse[]>;
  countTotalUsersMember(teamName: string, search?: string): Promise<number>;
  getUsersTeam(teamName: string, page: number, search?: string): Promise<UserTeamResponse[]>;
  countTotalUsersTeam(teamName: string, search?: string): Promise<number>;
}

export interface ITeamRepository {
  createTeam(teamName: string): Promise<void>;
  checkTeamIsExist(teamName: string): Promise<boolean>;
  getTeams(page: number, search?: string): Promise<IdAndName[]>;
  getAllTeams(): Promise<IdAndName[]>;
  countTotalTeams(search?: string): Promise<number>;
  deleteTeam(id: number): Promise<void>;
  getTeamById(id: number): Promise<IdAndName | undefined>;
  getTeamByName(teamName: string): Promise<IdAndName | undefined>;
  updateTeam(id: number, teamName: string): Promise<void>;
}

export interface IUserTeamRepository {
  createUserTeam(userTeamRequest: UserTeamRequest): Promise<void>;
  updateUserTeam(userTeamRequest: UserTeamRequest): Promise<void>;
  deleteUserTeam(teamId: number, userId: number): Promise<void>;
}

export interface IToolRepository {
  createTool(toolName: string): Promise<void>;
  checkToolIsExist(toolName: string): Promise<boolean>;
  getTools(page: number, search?: string): Promise<IdAndName[]>;
  getAllTools(): Promise<IdAndName[]>;
  countTotalTools(search?: string): Promise<number>;
  getToolByName(toolName: string): Promise<IdAndName | undefined>;
  getToolById(id: number): Promise<IdAndName | undefined>;
  updateTool(id: number, toolName: string): Promise<void>;
  deleteTool(id: number): Promise<void>;
  countUsedToolInProject(id: number): Promise<number>;
}

export interface IProjectRepository {
  createProject(projectRequest: CreateProjectRequest): Promise<void>;
  checkProjectIsExist(projectName: string): Promise<boolean>;
  checkProjectIsExistByTeamId(projectName: string, teamId: number): Promise<boolean>;
  getProjects(page: number, search?: string): Promise<ProjectResponse[]>;
  countTotalProjects(search?: string): Promise<number>;
  getProjectById(id: number): Promise<ProjectResponseEdit | undefined>;
  getProjectByNameAndByTeamId(projectName: string, teamId: number): Promise<ProjectResponseEdit | undefined>;
  updateProject(editProjectRequest: EditProjectRequest): Promise<void>;
  deleteProject(id: number): Promise<void>;
  getProjectDashboardByNameAndTeamId(projectName: string, teamId: number): Promise<ProjectDashboard | undefined>;
  updateProjectDashboard(editProjectDashboardReq: ProjectDashboardEditRequest): Promise<void>;
  getProjectAdditionalByNameAndTeamId(projectName: string, teamId: number): Promise<ProjectAdditional | undefined>;
  updateProjectAdditional(editProjectAdditionalReq: ProjectAdditionalEditRequest): Promise<void>;
}

export interface IModuleRepository {
  createModule(moduleRequest: CreateModuleRequest): Promise<void>;
  checkModuleIsExist(moduleName: string, projectId: number): Promise<boolean>;
  getModulesByProjectId(projectId: number): Promise<ModuleResponse[]>;
}
