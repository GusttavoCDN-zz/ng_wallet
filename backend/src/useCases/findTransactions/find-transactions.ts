import { FindTransactionsRepository } from '../../repositories/TransactionsRepository';

export type TransactionModel = {
  id: number
  debitedAccountId: string
  creditedAccountId: string
  value: number
  createdAt: Date
};

export class FindTransactionsUseCase {
  constructor(private readonly transactionsRepository: FindTransactionsRepository) {}

  execute = async (accountId: string): Promise<TransactionModel[]> => {
    const transactions = await this.transactionsRepository.find(accountId);
    return transactions;
  };
}
