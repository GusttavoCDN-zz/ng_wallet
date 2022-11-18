import { Account } from '../entities/account';

export type TransactionData = {
  debitedAccount: string
  creditedAccount: string
  ammount: number
};

export interface FindAccountRepository {
  find: (accountId: string) => Promise<Account | null>
}

export interface MakeTransactionRepository {
  makeTransaction: (data: TransactionData) => Promise<void>
}
