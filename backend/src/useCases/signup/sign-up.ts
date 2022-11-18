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
  id: number
  username: string
  accountId: string
};

export class SignupUseCase {
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

    const newUser = await this.usersRepository.add({
      username,
      password: encryptedPassword
    });

    return { id: newUser.id, username, accountId: newUser.accountId };
  };
}
