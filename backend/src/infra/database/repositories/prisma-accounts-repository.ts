import { Account } from '@prisma/client';
import {
  FindAccountRepository,
  MakeTransactionRepository,
  TransactionData
} from '../../../application/contracts';
import prismaClient from '../prisma/config/config';

export class PrismaAccountsRepository
implements FindAccountRepository, MakeTransactionRepository {
  private readonly accountModel = prismaClient.account;
  private readonly transactionModel = prismaClient.transaction;

  find = async (accountId: string): Promise<Account | null> => {
    return await this.accountModel.findUnique({
      where: { id: accountId }
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
