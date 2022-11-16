import { User } from '../../entities/user';
import { ConflictError } from '../../errors';
import {
  FindUserRepository,
  AddUserRepository
} from '../../repositories/UsersRepository';
import { PasswordEncrypter } from '../../utils/PasswordEncrypter';

type CreateUserRequest = {
  username: string
  password: string
};

type CreateUserResponse = {
  id: string
  username: string
  accountId: string
};

export class CreateUserUseCase {
  constructor(
    private readonly usersRepository: AddUserRepository & FindUserRepository,
    private readonly passwordEncrypter: PasswordEncrypter
  ) {}

  execute = async ({
    username,
    password
  }: CreateUserRequest): Promise<CreateUserResponse> => {
    const userAlreadyExists = await this.usersRepository.find(username);

    if (userAlreadyExists) throw new ConflictError('User already exists');

    const encryptedPassword = await this.passwordEncrypter.encrypt(password);

    const user = new User({
      username,
      password: encryptedPassword
    });

    await this.usersRepository.add(user);

    return { id: user.id, username: user.username, accountId: user.accountId };
  };
}
