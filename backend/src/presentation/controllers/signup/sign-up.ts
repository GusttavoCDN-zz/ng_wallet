import { SignupUseCase } from '../../../application/useCases';
import { InvalidRequestError } from '../../../errors';
import { Controller, RequestValidator, HttpRequest, HttpResponse } from '../../contracts';

export class Signup implements Controller {
  constructor(
    private readonly signup: SignupUseCase,
    private readonly requestValidator: RequestValidator
  ) {}

  handle = async (request: HttpRequest): Promise<HttpResponse> => {
    const isRequestValid = await this.requestValidator.validate(request.body);

    if (!isRequestValid) {
      throw new InvalidRequestError(
        'Please check the username and password fields and try again'
      );
    }

    const userData = await this.signup.execute(request.body);

    return {
      statusCode: 201,
      body: userData
    };
  };
}
