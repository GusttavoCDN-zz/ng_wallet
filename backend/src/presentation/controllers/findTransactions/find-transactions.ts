import { FindTransactionsUseCase } from '../../../application/useCases';
import { Controller, HttpRequest, HttpResponse } from '../../contracts';

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
