import { FindTransactionsRepository } from '../../contracts';
import { TransactionModel } from '../../models/transaction-model';

export class FindTransactionsUseCase {
  constructor(private readonly transactionsRepository: FindTransactionsRepository) {}

  execute = async (accountId: string): Promise<TransactionModel[]> => {
    const transactions = await this.transactionsRepository.find(accountId);
    return transactions;
  };
}
