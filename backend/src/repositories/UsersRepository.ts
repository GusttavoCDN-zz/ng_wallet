import { User } from '../entities/user';

export interface AddUserRepository {
  add: (user: User) => Promise<void>
}

export interface FindUserRepository {
  find: (username: string) => Promise<User | null>
}
