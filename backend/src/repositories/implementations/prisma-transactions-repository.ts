import { FindTransactionsRepository } from '../TransactionsRepository';
import prismaClient from '../../database/prisma/config/config';
import { TransactionModel } from '../../useCases/findTransactions/find-transactions';

export class PrismaTransactionsRepository implements FindTransactionsRepository {
  find = async (accountId: string): Promise<TransactionModel[]> => {
    const transactions = await prismaClient.transaction.findMany({
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
