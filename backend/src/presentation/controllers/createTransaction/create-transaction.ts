import { CreateTransactionUseCase } from '../../../application/useCases';
import { InvalidRequestError } from '../../../errors';
import {
  Controller,
  RequestValidator,
  HttpRequest,
  HttpResponse,
  RequestUser
} from '../../contracts';

export class CreateTransaction implements Controller {
  constructor(
    private readonly createTransaction: CreateTransactionUseCase,
    private readonly requestValidator: RequestValidator
  ) {}

  handle = async (request: HttpRequest): Promise<HttpResponse> => {
    const { account } = request.user as RequestUser;

    const isRequestValid = await this.requestValidator.validate(request.body);

    if (!isRequestValid) {
      throw new InvalidRequestError('Invalid request. Please check your request body.');
    }

    await this.createTransaction.execute({
      debitedAccount: account,
      creditedUsername: request.body.creditedUsername,
      amount: request.body.amount
    });

    return {
      statusCode: 201,
      body: { message: 'Transaction created' }
    };
  };
}
