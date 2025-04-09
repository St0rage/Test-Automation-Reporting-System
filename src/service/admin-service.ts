import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import { IUserRepository } from "../interface/repository/repository-interface";
import { IAdminService } from "../interface/service/service-interface";
import { CreateUserInsertRequest, CreateUserRequest, EditUserRequest, IdAndName, UserResponse } from "../model/model";
import { UserUtil } from "../utils/user-util";
import { ResponseError } from "../error/response-error";

@injectable()
export class AdminService implements IAdminService {
  constructor(@inject(TYPES.IUserRepository) private userRepository: IUserRepository) {}

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
}
