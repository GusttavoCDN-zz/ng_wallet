import { TransactionModel } from '../useCases/findTransactions/find-transactions';

export interface FindTransactionsRepository {
  find: (accountId: string) => Promise<TransactionModel[]>
}
