import { Transaction } from '../../entities/transaction';
import { NotFoundError } from '../../errors';
import {
  FindAccountRepository,
  MakeTransactionRepository
} from '../../repositories/AccountsRepository';

type CreateTransactionRequest = {
  amount: number
  cashOutAccount: string
  cashInAccount: string
};

export class CreateTransactionUseCase {
  constructor(
    private readonly accountsRepository: FindAccountRepository & MakeTransactionRepository
  ) {}

  execute = async (data: CreateTransactionRequest): Promise<void> => {
    const debitedAccount = await this.accountsRepository.find(data.cashOutAccount);

    if (!debitedAccount) throw new NotFoundError('Account not found');

    const creditedAccount = await this.accountsRepository.find(data.cashInAccount);

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
      ammount: transaction.amount
    });
  };
}
