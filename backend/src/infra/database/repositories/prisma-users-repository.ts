import { User } from '@prisma/client';
import { AddUserRepository, FindUserRepository } from '../../../application/contracts';
import { CreateUserDTO } from '../../../application/useCases/signup/dtos';
import prismaClient from '../prisma/config/config';
export class PrismaUsersRepository implements AddUserRepository, FindUserRepository {
  private readonly userModel = prismaClient.user;

  create = async (data: CreateUserDTO): Promise<User> => {
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

    return newUser;
  };

  findByUsername = async (username: string): Promise<User | null> => {
    return await this.userModel.findUnique({
      where: { username }
    });
  };
}
