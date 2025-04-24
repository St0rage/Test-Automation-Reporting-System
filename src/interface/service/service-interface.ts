import {
  CreateUserRequest,
  EditUserRequest,
  IdAndName,
  UserDetailResponse,
  UserMemberResponse,
  UserResponse,
  UserTeamResponse,
} from "../../model/model";

export interface IUserService {
  //   getUser(): Promise<IdAndName[]>;
}

export interface IAdminService {
  getRoles(): Promise<IdAndName[]>;
  createUser(userRequest: CreateUserRequest): Promise<void>;
  checkUsernameIsExist(username: string): Promise<boolean>;
  getUsers(page: number, search?: string): Promise<UserResponse[]>;
  getTotalUsers(search?: string): Promise<number>;
  resetUserPassword(id: number): Promise<void>;
  deleteUser(id: number): Promise<void>;
  getUserById(id: number): Promise<UserResponse>;
  getUserByUsername(username: string): Promise<UserResponse>;
  getUserDetailByUsername(username: string): Promise<UserDetailResponse>;
  editUser(userEditRequest: EditUserRequest): Promise<void>;
  createTeam(teamName: string): Promise<void>;
  checkTeamIsExist(teamName: string): Promise<boolean>;
  getTeams(page: number, search?: string): Promise<IdAndName[]>;
  getTotalTeams(search?: string): Promise<number>;
  deleteTeam(id: number): Promise<void>;
  getTeamById(id: number): Promise<IdAndName>;
  getTeamByName(teamName: string): Promise<IdAndName>;
  editTeam(id: number, teamName: string): Promise<void>;
  getUserMembers(team: string, page: number, search?: string): Promise<UserMemberResponse[]>;
  getTotalUserMembers(team: string, search?: string): Promise<number>;
  getUsersTeam(teamName: string, page: number, search?: string): Promise<UserTeamResponse[]>;
  getTotalUsersTeam(teamName: string, search?: string): Promise<number>;
  createUserTeam(teamName: string, userId: number, leader: boolean): Promise<void>;
  editUserTeam(teamName: string, userId: number, leader: boolean): Promise<void>;
  deleteUserTeam(teamName: string, userId: number): Promise<void>;
  createTool(toolName: string): Promise<void>;
  checkToolNameIsExist(toolName: string): Promise<boolean>;
  getTools(page: number, search?: string): Promise<IdAndName[]>;
  getTotalTools(search?: string): Promise<number>;
  getToolByName(toolName: string): Promise<IdAndName>;
}
