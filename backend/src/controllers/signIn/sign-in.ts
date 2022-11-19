import { InvalidRequestError } from '../../errors';
import { SignInUseCase } from '../../useCases/signIn/sign-in';
import { Controller } from '../Controller';
import { HttpRequest, HttpResponse } from '../Http';
import { RequestValidator } from '../RequestValidator';

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
