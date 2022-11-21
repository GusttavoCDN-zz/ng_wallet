import { NotFoundError } from '../../../errors';
import { FindUserRepository, PasswordCompare, TokenGenerator } from '../../contracts/';

type UserCredentials = {
  username: string
  password: string
};

type UserAccessData = {
  id: number
  username: string
  token: string
  account: string
};

export class SignInUseCase {
  constructor(
    private readonly usersRepository: FindUserRepository,
    private readonly passwordCompare: PasswordCompare,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  execute = async ({ username, password }: UserCredentials): Promise<UserAccessData> => {
    const user = await this.usersRepository.find(username);

    if (!user) throw new NotFoundError('User or password invalid');

    const isPasswordValid = await this.passwordCompare.compare(password, user.password);

    if (!isPasswordValid) throw new NotFoundError('User or password invalid');

    const token = await this.tokenGenerator.generate({
      id: user.id,
      username: user.username
    });

    return { id: user.id, username: user.username, account: user.accountId, token };
  };
}
