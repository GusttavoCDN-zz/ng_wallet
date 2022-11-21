import { SignInUseCase } from '../../application/useCases/signIn/sign-in';
import { RequestValidator } from '../../contracts/RequestValidator';
import { SignIn } from './sign-in';

const fakeUserDataAccess = {
  id: 'any_id',
  username: 'any_username',
  token: 'any_token'
};

const fakeRequest = {
  body: {
    username: 'any_username',
    password: 'any_password'
  }
};

type SutTypes = {
  sut: SignIn
  signInStub: jest.Mocked<SignInUseCase>
  requestValidator: jest.Mocked<RequestValidator>
};

const makeSut = (): SutTypes => {
  const signInStub: jest.Mocked<SignInUseCase> = {
    execute: jest.fn().mockResolvedValue(fakeUserDataAccess)
  } as any;
  const requestValidator: jest.Mocked<RequestValidator> = {
    validate: jest.fn().mockResolvedValue(true)
  };

  const sut = new SignIn(signInStub, requestValidator);

  return { sut, signInStub, requestValidator };
};

describe('Sign-in controller test', () => {
  it('Should call validate with correct values', async () => {
    const { sut, requestValidator } = makeSut();

    await sut.handle(fakeRequest);

    expect(requestValidator.validate).toHaveBeenCalledWith(fakeRequest.body);
  });

  it('Should return statusCode 400 if data is invalid', async () => {
    const { sut, requestValidator } = makeSut();
    requestValidator.validate.mockResolvedValueOnce(false);

    const response = await sut.handle(fakeRequest);

    expect(response.statusCode).toBe(400);
  });

  it('Should call execute with correct values', async () => {
    const { sut, signInStub } = makeSut();

    await sut.handle(fakeRequest);

    expect(signInStub.execute).toHaveBeenCalledWith(fakeRequest.body);
  });

  it('Should return statusCode 200 if data is valid', async () => {
    const { sut } = makeSut();

    const response = await sut.handle(fakeRequest);

    expect(response.statusCode).toBe(200);
  });
});
