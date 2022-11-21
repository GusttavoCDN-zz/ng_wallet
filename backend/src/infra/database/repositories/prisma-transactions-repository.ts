import { FindTransactionsRepository } from '../../../application/contracts';
import { TransactionModel } from '../../../application/models/transaction-model';

import prismaClient from '../prisma/config/config';

export class PrismaTransactionsRepository implements FindTransactionsRepository {
  private readonly transactionModel = prismaClient.transaction;

  find = async (accountId: string): Promise<TransactionModel[]> => {
    const transactions = await this.transactionModel.findMany({
      where: {
        OR: [
          { debitedAccount: { id: accountId } },
          { creditedAccount: { id: accountId } }
        ]
      }
    });

    return transactions;
  };
}
