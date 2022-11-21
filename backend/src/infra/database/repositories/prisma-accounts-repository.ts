import { Account } from '@prisma/client';
import {
  FindAccountRepository,
  MakeTransactionRepository
} from '../../../application/contracts';
import { CreateTransactionDTO } from '../../../application/useCases/createTransaction/dtos';
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

  makeTransaction = async (data: CreateTransactionDTO): Promise<void> => {
    await prismaClient.$transaction([
      this.accountModel.update({
        data: {
          balance: {
            decrement: data.amount
          }
        },
        where: { id: data.debitedAccount }
      }),

      this.accountModel.update({
        data: {
          balance: {
            increment: data.amount
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
          value: data.amount
        }
      })
    ]);
  };
}
