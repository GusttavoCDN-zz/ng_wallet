import { FindTransactionsUseCase } from '../../useCases/findTransactions/find-transactions';
import { Controller } from '../Controller';
import { HttpRequest, HttpResponse } from '../Http';

export class FindTransactions implements Controller {
  constructor(private readonly findTransactions: FindTransactionsUseCase) {}

  handle = async (request: HttpRequest): Promise<HttpResponse> => {
    const { accountId } = request.params;

    const transactions = await this.findTransactions.execute(accountId);
    return {
      statusCode: 200,
      body: transactions
    };
  };
}
