import { InvalidRequestError } from '../../errors';
import { SignupUseCase } from '../../useCases/signup/sign-up';
import { Controller } from '../Controller';
import { HttpRequest, HttpResponse } from '../Http';
import { RequestValidator } from '../RequestValidator';

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
