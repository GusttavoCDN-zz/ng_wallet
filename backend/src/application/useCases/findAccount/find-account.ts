import { NotFoundError } from '../../../errors';
import { FindAccountRepository } from '../../contracts';
import { AccountModel } from '../../models/account-model';

export class FindAccountUseCase {
  constructor(private readonly accountsRepository: FindAccountRepository) {}

  execute = async (accountId: string): Promise<AccountModel> => {
    const account = await this.accountsRepository.find(accountId);

    if (!account) throw new NotFoundError('Account not found');

    return account;
  };
}
