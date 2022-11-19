import { InvalidRequestError } from '../../errors';
import { CreateTransactionUseCase } from '../../useCases/createTransaction/create-transaction';
import { Controller } from '../Controller';
import { HttpRequest, HttpResponse } from '../Http';
import { RequestValidator } from '../RequestValidator';

export class CreateTransaction implements Controller {
  constructor(
    private readonly createTransaction: CreateTransactionUseCase,
    private readonly requestValidator: RequestValidator
  ) {}

  handle = async (request: HttpRequest): Promise<HttpResponse> => {
    const isRequestValid = await this.requestValidator.validate(request.body);

    if (!isRequestValid) {
      throw new InvalidRequestError('Invalid request. Please check your request body.');
    }

    await this.createTransaction.execute(request.body);

    return {
      statusCode: 201,
      body: { message: 'Transaction created' }
    };
  };
}
