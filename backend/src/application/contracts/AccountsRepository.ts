import { AccountModel } from '../models/account-model';
import { CreateTransactionDTO } from '../useCases/createTransaction/dtos';

export interface FindAccountRepository {
  find: (accountId: string) => Promise<AccountModel | null>
}

export interface MakeTransactionRepository {
  makeTransaction: (data: CreateTransactionDTO) => Promise<void>
}
