import { Account } from '../../entities/account';
import { NotFoundError } from '../../errors';
import { FindAccountRepository } from '../../repositories/AccountsRepository';

export class FindAccountUseCase {
  constructor(private readonly accountsRepository: FindAccountRepository) {}

  execute = async (accountId: string): Promise<Account> => {
    const account = await this.accountsRepository.find(accountId);

    if (!account) throw new NotFoundError('Account not found');

    return account;
  };
}
