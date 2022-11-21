import { FindAccountUseCase } from '../../../application/useCases';
import { Controller, HttpRequest, HttpResponse } from '../../contracts';

export class FindAccount implements Controller {
  constructor(private readonly findAccount: FindAccountUseCase) {}

  handle = async (request: HttpRequest): Promise<HttpResponse> => {
    const { accountId } = request.params;

    const account = await this.findAccount.execute(accountId as string);

    return {
      statusCode: 200,
      body: account
    };
  };
}
