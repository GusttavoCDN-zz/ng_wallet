import { User } from '@prisma/client';
import {
  AddUserRepository,
  FindUserRepository,
  createUserDTO
} from '../../../application/contracts';
import { user } from '../prisma/models/user-model';

export class PrismaUsersRepository implements AddUserRepository, FindUserRepository {
  private readonly userModel = user;

  add = async (data: createUserDTO): Promise<User> => {
    const { username, password } = data;

    const newUser = await this.userModel.create({
      data: {
        username,
        password,
        account: {
          create: {}
        }
      }
    });

    return { id: newUser.id, username, password, accountId: newUser.accountId };
  };

  find = async (username: string): Promise<User | null> => {
    return await this.userModel.findUnique({
      where: {
        username
      }
    });
  };
}
