import { Account } from '../../entities/account';
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

    if (!creditedAccount) throw new NotFoundError('Account not found');

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

  private readonly validateIfDebitedAccountCanMakeTransaction = (
    debitedAmount: number,
    cashOutAccountRequest: string,
    debitedAccount: Account
  ): void => {
    if (cashOutAccountRequest === debitedAccount.id) {
      throw new Error('You cannot make a transaction to your own account');
    }

    if (debitedAmount > debitedAccount.balance) {
      throw new Error('You do not have enough balance to make this transaction');
    }
  };
}
