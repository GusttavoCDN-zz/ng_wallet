import { Transaction } from '../../../domain';
import { NotFoundError } from '../../../errors';
import { FindAccountRepository, MakeTransactionRepository } from '../../contracts/';
import { CreateTransactionDTO } from './dtos';

export class CreateTransactionUseCase {
  constructor(
    private readonly accountsRepository: FindAccountRepository & MakeTransactionRepository
  ) {}

  execute = async (data: CreateTransactionDTO): Promise<void> => {
    const debitedAccount = await this.accountsRepository.find(data.debitedAccount);

    if (!debitedAccount) throw new NotFoundError('Account not found');

    const creditedAccount = await this.accountsRepository.find(data.creditedAccount);

    if (!creditedAccount) {
      throw new NotFoundError('The account you are trying to credit was not found!');
    }

    const transaction = Transaction.create({
      amount: data.amount,
      debitedAccount,
      creditedAccount
    });

    await this.accountsRepository.makeTransaction({
      debitedAccount: transaction.debitedAccount.id,
      creditedAccount: transaction.creditedAccount.id,
      amount: transaction.amount
    });
  };
}
