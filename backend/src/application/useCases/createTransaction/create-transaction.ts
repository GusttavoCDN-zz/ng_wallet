import { Transaction } from '../../../domain';
import { NotFoundError } from '../../../errors';
import {
  FindAccountRepository,
  FindUserRepository,
  MakeTransactionRepository
} from '../../contracts/';
import { AccountModel } from '../../models/account-model';
import { UserModel } from '../../models/user-model';
import { CreateTransactionDTO } from './dtos';

export class CreateTransactionUseCase {
  constructor(
    private readonly accountsRepository: FindAccountRepository &
    MakeTransactionRepository,
    private readonly usersRepository: FindUserRepository
  ) {}

  execute = async (data: CreateTransactionDTO): Promise<void> => {
    const debitedAccount = await this.accountsRepository.find(data.debitedAccount);

    if (!debitedAccount) throw new NotFoundError('Account not found');

    const creditedUser = (await this.usersRepository.findByUsername(
      data.creditedUsername
    )) as UserModel;

    if (!creditedUser) {
      throw new NotFoundError('The account you are trying to credit was not found!');
    }

    const creditedAccount = (await this.accountsRepository.find(
      creditedUser.accountId
    )) as AccountModel;

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
