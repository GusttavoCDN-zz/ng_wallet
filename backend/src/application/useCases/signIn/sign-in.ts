import { NotFoundError } from '../../../errors';
import { FindUserRepository, PasswordCompare, TokenGenerator } from '../../contracts/';
import { UserCredentialsDTO, UserAccessDataDTO } from './dtos';

export class SignInUseCase {
  constructor(
    private readonly usersRepository: FindUserRepository,
    private readonly passwordCompare: PasswordCompare,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  execute = async ({
    username,
    password
  }: UserCredentialsDTO): Promise<UserAccessDataDTO> => {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) throw new NotFoundError('User or password invalid');

    const isPasswordValid = await this.passwordCompare.compare(password, user.password);

    if (!isPasswordValid) throw new NotFoundError('User or password invalid');

    const token = await this.tokenGenerator.generate({
      id: user.id,
      username: user.username,
      account: user.accountId
    });

    return { id: user.id, username: user.username, account: user.accountId, token };
  };
}
