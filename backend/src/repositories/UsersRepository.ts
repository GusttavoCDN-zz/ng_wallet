import { User } from '../entities/user';

type createUserDTO = {
  username: string
  password: string
};

export interface AddUserRepository {
  add: (data: createUserDTO) => Promise<User>
}

export interface FindUserRepository {
  find: (username: string) => Promise<User | null>
}
