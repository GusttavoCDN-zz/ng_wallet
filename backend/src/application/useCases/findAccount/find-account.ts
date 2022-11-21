import { Account } from '../../../domain';
import { NotFoundError } from '../../../errors';
import { FindAccountRepository } from '../../contracts';

export class FindAccountUseCase {
  constructor(private readonly accountsRepository: FindAccountRepository) {}

  execute = async (accountId: string): Promise<Account> => {
    const account = await this.accountsRepository.find(accountId);

    if (!account) throw new NotFoundError('Account not found');

    return account;
  };
}
