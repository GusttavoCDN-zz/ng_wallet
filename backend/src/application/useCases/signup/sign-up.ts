import { ConflictError } from '../../../errors';
import {
  FindUserRepository,
  AddUserRepository,
  PasswordEncrypter
} from '../../contracts/';
import { CreatedUserDTO, CreateUserDTO } from './dtos';

export class SignupUseCase {
  constructor(
    private readonly usersRepository: AddUserRepository & FindUserRepository,
    private readonly passwordEncrypter: PasswordEncrypter
  ) {}

  execute = async ({ username, password }: CreateUserDTO): Promise<CreatedUserDTO> => {
    const userAlreadyExists = await this.usersRepository.findByUsername(username);

    if (userAlreadyExists) throw new ConflictError('User already exists');

    const encryptedPassword = await this.passwordEncrypter.encrypt(password);

    const newUser = await this.usersRepository.create({
      username,
      password: encryptedPassword
    });

    return { id: newUser.id, username, account: newUser.accountId };
  };
}
