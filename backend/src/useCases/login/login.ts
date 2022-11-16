import { NotFoundError } from '../../errors';
import { BadRequestError } from '../../errors/bad-request';
import { FindUserRepository } from '../../repositories/UsersRepository';
import { PasswordCompare } from '../../utils/PasswordCompare';
import { TokenGenerator } from '../../utils/TokenGenerator';

type UserCredentials = {
  username: string
  password: string
};

type UserAccessData = {
  id: string
  username: string
  token: string
};

export class Login {
  constructor(
    private readonly usersRepository: FindUserRepository,
    private readonly passwordCompare: PasswordCompare,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  execute = async ({ username, password }: UserCredentials): Promise<UserAccessData> => {
    const user = await this.usersRepository.find(username);

    if (!user) throw new NotFoundError('User not found');

    const isPasswordValid = await this.passwordCompare.compare(password, user.password);

    if (!isPasswordValid) throw new BadRequestError('User or password invalid');

    const token = await this.tokenGenerator.generate({
      id: user.id,
      username: user.username
    });

    return { id: user.id, username: user.username, token };
  };
}
