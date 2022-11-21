import { Account } from '../../domain';

export type TransactionData = {
  debitedAccount: string
  creditedAccount: string
  ammount: number
};

export interface FindAccountRepository {
  find: (username: string) => Promise<Account | null>
}

export interface MakeTransactionRepository {
  makeTransaction: (data: TransactionData) => Promise<void>
}
