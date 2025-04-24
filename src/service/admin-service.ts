import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import {
  ITeamRepository,
  IToolRepository,
  IUserRepository,
  IUserTeamRepository,
} from "../interface/repository/repository-interface";
import { IAdminService } from "../interface/service/service-interface";
import {
  CreateUserInsertRequest,
  CreateUserRequest,
  EditUserRequest,
  IdAndName,
  UserDetailResponse,
  UserMemberResponse,
  UserResponse,
  UserTeamRequest,
  UserTeamResponse,
} from "../model/model";
import { UserUtil } from "../utils/user-util";
import { ResponseError } from "../error/response-error";

@injectable()
export class AdminService implements IAdminService {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(TYPES.ITeamRepository) private teamRepository: ITeamRepository,
    @inject(TYPES.IUserTeamRepository) private userTeamRepository: IUserTeamRepository,
    @inject(TYPES.IToolRepository) private toolRepository: IToolRepository
  ) {}

  async getRoles(): Promise<IdAndName[]> {
    return this.userRepository.getRoles();
  }

  async createUser(userRequest: CreateUserRequest): Promise<void> {
    const password = UserUtil.generatePassword();
    const hashPassword = await UserUtil.hashPassword(password);

    const userInsertRequest: CreateUserInsertRequest = {
      name: userRequest.name,
      username: userRequest.username,
      roleId: parseInt(userRequest.roleId),
      password: hashPassword,
      tempPassword: password,
      reset: true,
    };

    await this.userRepository.createUser(userInsertRequest);
  }

  async checkUsernameIsExist(username: string): Promise<boolean> {
    return this.userRepository.checkUsernameIsExist(username);
  }

  async getUsers(page: number, search?: string): Promise<UserResponse[]> {
    return this.userRepository.getUsers(page, search);
  }

  async getUserById(id: number): Promise<UserResponse> {
    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new ResponseError(404, "Not Found");
    }

    return user;
  }

  async getUserByUsername(username: string): Promise<UserResponse> {
    const user = await this.userRepository.getUserByUsername(username);

    if (!user) {
      throw new ResponseError(404, "Not Found");
    }

    return user;
  }

  async getUserDetailByUsername(username: string): Promise<UserDetailResponse> {
    const user = await this.userRepository.getUserDetailByUsername(username);

    if (!user) {
      throw new ResponseError(404, "Not Found");
    }

    return user;
  }

  async getTotalUsers(search?: string): Promise<number> {
    return this.userRepository.countTotalUsers(search);
  }

  async resetUserPassword(id: number): Promise<void> {
    const password = UserUtil.generatePassword();
    const hashPassword = await UserUtil.hashPassword(password);

    await this.userRepository.resetPassword(id, hashPassword, password);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.deleteUser(id);
  }

  async editUser(userEditRequest: EditUserRequest): Promise<void> {
    await this.userRepository.updateUser(userEditRequest);
  }

  async createTeam(teamName: string): Promise<void> {
    await this.teamRepository.createTeam(teamName.toUpperCase());
  }

  async checkTeamIsExist(teamName: string): Promise<boolean> {
    return this.teamRepository.checkTeamIsExist(teamName.toUpperCase());
  }

  async getTeams(page: number, search?: string): Promise<IdAndName[]> {
    return this.teamRepository.getTeams(page, search?.toUpperCase());
  }

  async getTotalTeams(search?: string): Promise<number> {
    return this.teamRepository.countTotalTeams(search);
  }

  async deleteTeam(id: number): Promise<void> {
    await this.teamRepository.deleteTeam(id);
  }

  async getTeamById(id: number): Promise<IdAndName> {
    const team = await this.teamRepository.getTeamById(id);

    if (!team) {
      throw new ResponseError(404, "Not Found");
    }

    return team;
  }

  async getTeamByName(teamName: string): Promise<IdAndName> {
    const team = await this.teamRepository.getTeamByName(teamName.toUpperCase());

    if (!team) {
      throw new ResponseError(404, "Not Found");
    }

    return team;
  }

  async editTeam(id: number, teamName: string): Promise<void> {
    await this.teamRepository.updateTeam(id, teamName);
  }

  async getUserMembers(team: string, page: number, search?: string): Promise<UserMemberResponse[]> {
    return this.userRepository.getUsersMember(team.toUpperCase(), page, search);
  }

  async getTotalUserMembers(team: string, search?: string): Promise<number> {
    return this.userRepository.countTotalUsersMember(team, search);
  }

  async getUsersTeam(teamName: string, page: number, search?: string): Promise<UserTeamResponse[]> {
    return this.userRepository.getUsersTeam(teamName.toUpperCase(), page, search);
  }

  async getTotalUsersTeam(teamName: string, search?: string): Promise<number> {
    return this.userRepository.countTotalUsersTeam(teamName.toUpperCase(), search);
  }

  async createUserTeam(teamName: string, userId: number, leader: boolean): Promise<void> {
    const team = await this.getTeamByName(teamName);

    const userTeamRequest: UserTeamRequest = {
      teamId: team.id,
      userId: userId,
      leader: leader,
    };

    await this.userTeamRepository.createUserTeam(userTeamRequest);
  }

  async editUserTeam(teamName: string, userId: number, leader: boolean): Promise<void> {
    const team = await this.getTeamByName(teamName);

    const userTeamRequest: UserTeamRequest = {
      teamId: team.id,
      userId: userId,
      leader: leader,
    };

    await this.userTeamRepository.updateUserTeam(userTeamRequest);
  }

  async deleteUserTeam(teamName: string, userId: number): Promise<void> {
    const team = await this.getTeamByName(teamName);

    await this.userTeamRepository.deleteUserTeam(team.id, userId);
  }

  async createTool(toolName: string): Promise<void> {
    await this.toolRepository.createTool(toolName);
  }

  async checkToolNameIsExist(toolName: string): Promise<boolean> {
    return this.toolRepository.checkToolIsExist(toolName);
  }

  async getTools(page: number, search?: string): Promise<IdAndName[]> {
    return this.toolRepository.getTools(page, search);
  }

  async getTotalTools(search?: string): Promise<number> {
    return this.toolRepository.countTotalTools(search);
  }

  async getToolByName(toolName: string): Promise<IdAndName> {
    const tool = await this.toolRepository.getToolByName(toolName);

    if (!tool) {
      throw new ResponseError(404, "Not Found");
    }

    return tool;
  }
}
