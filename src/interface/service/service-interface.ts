import { CreateUserRequest, EditUserRequest, IdAndName, UserResponse } from "../../model/model";

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
  editUser(userEditRequest: EditUserRequest): Promise<void>;
}
