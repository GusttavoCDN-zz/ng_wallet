import { FindTransactionsRepository } from '../../../application/contracts';
import { TransactionModel } from '../../../application/useCases';
import prismaClient from '../prisma/config/config';

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
