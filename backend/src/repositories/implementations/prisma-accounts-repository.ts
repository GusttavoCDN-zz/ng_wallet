import {
  FindAccountRepository,
  MakeTransactionRepository,
  TransactionData
} from '../AccountsRepository';
import prismaClient from '../../database/prisma/config/config';
import { Account } from '../../entities/account';

export class PrismaAccountsRepository
implements FindAccountRepository, MakeTransactionRepository {
  private readonly accountModel = prismaClient.account;
  private readonly transactionModel = prismaClient.transaction;

  find = async (username: string): Promise<Account | null> => {
    const user = await prismaClient.user.findUnique({
      where: { username }
    });

    return await this.accountModel.findUnique({
      where: { id: user?.accountId }
    });
  };

  makeTransaction = async (data: TransactionData): Promise<void> => {
    await prismaClient.$transaction([
      this.accountModel.update({
        data: {
          balance: {
            decrement: data.ammount
          }
        },
        where: { id: data.debitedAccount }
      }),

      this.accountModel.update({
        data: {
          balance: {
            increment: data.ammount
          }
        },
        where: { id: data.creditedAccount }
      }),

      this.transactionModel.create({
        data: {
          creditedAccount: {
            connect: { id: data.creditedAccount }
          },
          debitedAccount: {
            connect: { id: data.debitedAccount }
          },
          value: data.ammount
        }
      })
    ]);
  };
}
