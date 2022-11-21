import { FindTransactionsUseCase } from '../../../application/useCases';
import { Controller, HttpRequest, HttpResponse, RequestUser } from '../../contracts';

export class FindTransactions implements Controller {
  constructor(private readonly findTransactions: FindTransactionsUseCase) {}

  handle = async (request: HttpRequest): Promise<HttpResponse> => {
    const { account: accountId } = request.user as RequestUser;

    const transactions = await this.findTransactions.execute(accountId);

    return {
      statusCode: 200,
      body: transactions
    };
  };
}
