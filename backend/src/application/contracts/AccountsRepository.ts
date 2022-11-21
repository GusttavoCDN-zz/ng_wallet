import { AccountModel } from '../models/account-model';

export type TransactionData = {
  debitedAccount: string
  creditedAccount: string
  amount: number
};
export interface FindAccountRepository {
  find: (accountId: string) => Promise<AccountModel | null>
}

export interface MakeTransactionRepository {
  makeTransaction: (data: TransactionData) => Promise<void>
}
