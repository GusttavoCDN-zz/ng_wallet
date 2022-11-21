import { UserModel } from '../models/user-model';
import { CreateUserDTO } from '../useCases/signup/dtos';
export interface AddUserRepository {
  create: (data: CreateUserDTO) => Promise<UserModel>
}

export interface FindUserRepository {
  findByUsername: (username: string) => Promise<UserModel | null>
}
