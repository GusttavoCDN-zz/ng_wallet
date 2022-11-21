import { TransactionModel } from '../models/transaction-model';

export interface FindTransactionsRepository {
  find: (accountId: string) => Promise<TransactionModel[]>
}
