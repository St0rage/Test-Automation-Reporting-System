import { CreateUserInsertRequest, EditUserRequest, IdAndName, UserResponse } from "../../model/model";

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
  updateUser(editUserRequest: EditUserRequest): Promise<void>;
}
