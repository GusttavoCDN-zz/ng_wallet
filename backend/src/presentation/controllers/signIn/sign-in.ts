import { SignInUseCase } from '../../../application/useCases';
import { InvalidRequestError } from '../../../errors';
import { Controller, RequestValidator, HttpRequest, HttpResponse } from '../../contracts';

export class SignIn implements Controller {
  constructor(
    private readonly signIn: SignInUseCase,
    private readonly requestValidator: RequestValidator
  ) {}

  handle = async (request: HttpRequest): Promise<HttpResponse> => {
    const isRequestValid = await this.requestValidator.validate(request.body);

    if (!isRequestValid) {
      throw new InvalidRequestError(
        'Please check the username and password fields and try again'
      );
    }

    const userDataAccess = await this.signIn.execute(request.body);

    return {
      statusCode: 200,
      body: userDataAccess
    };
  };
}
