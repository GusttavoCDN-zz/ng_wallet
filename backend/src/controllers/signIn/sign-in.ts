import { BadRequestError } from '../../errors/bad-request';
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
      return {
        statusCode: 400,
        body: new BadRequestError('Invalid request')
      };
    }

    const userDataAccess = await this.signIn.execute(request.body);

    return {
      statusCode: 200,
      body: userDataAccess
    };
  };
}
