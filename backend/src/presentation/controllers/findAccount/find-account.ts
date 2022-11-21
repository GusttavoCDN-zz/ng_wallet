import { FindAccountUseCase } from '../../../application/useCases';
import { Controller, HttpRequest, HttpResponse, RequestUser } from '../../contracts';

export class FindAccount implements Controller {
  constructor(private readonly findAccount: FindAccountUseCase) {}

  handle = async (request: HttpRequest): Promise<HttpResponse> => {
    const { account: accountId } = request.user as RequestUser;

    const account = await this.findAccount.execute(accountId);

    return {
      statusCode: 200,
      body: account
    };
  };
}
