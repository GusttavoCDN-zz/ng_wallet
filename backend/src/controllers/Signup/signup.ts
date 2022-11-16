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
      return {
        statusCode: 400,
        body: { message: 'Invalid request' }
      };
    }

    const userData = await this.signup.execute(request.body);

    return {
      statusCode: 201,
      body: userData
    };
  };
}
