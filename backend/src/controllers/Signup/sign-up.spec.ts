import { SignupUseCase } from '../../useCases/signup/sign-up';
import { RequestValidator } from '../RequestValidator';
import { Signup } from './sign-up';

const fakeResponse = {
  statusCode: 201,
  body: {
    id: 'any_id',
    username: 'any_username',
    accountId: 'any_account_id'
  }
};

const fakeRequest = {
  body: {
    username: 'any_username',
    password: 'any_password'
  }
};

type SutTypes = {
  sut: Signup
  createUserStub: jest.Mocked<SignupUseCase>
  requestValidatorStub: jest.Mocked<RequestValidator>
};

const makeSut = (): SutTypes => {
  const createUserStub: jest.Mocked<SignupUseCase> = {
    execute: jest.fn().mockResolvedValue(fakeResponse.body)
  } as any;
  const requestValidatorStub: jest.Mocked<RequestValidator> = {
    validate: jest.fn().mockResolvedValue(true)
  };
  const sut = new Signup(createUserStub, requestValidatorStub);

  return { sut, createUserStub, requestValidatorStub };
};

describe('Signup controller test', () => {
  it('Should call validate with request body', async () => {
    const { sut, requestValidatorStub } = makeSut();
    const validateSpy = jest.spyOn(requestValidatorStub, 'validate');

    await sut.handle(fakeRequest);

    expect(validateSpy).toHaveBeenCalledWith(fakeRequest.body);
  });

  it('Should return an badRequest with statusCode 400 if request is invalid', async () => {
    const { sut, requestValidatorStub } = makeSut();
    requestValidatorStub.validate.mockResolvedValueOnce(false);

    const response = await sut.handle(fakeRequest);

    expect(response).toEqual({
      statusCode: 400,
      body: { message: 'Invalid request' }
    });
  });

  it('Should call createUser with request body', async () => {
    const { sut, createUserStub } = makeSut();
    const executeSpy = jest.spyOn(createUserStub, 'execute');

    await sut.handle(fakeRequest);

    expect(executeSpy).toHaveBeenCalledWith(fakeRequest.body);
  });

  it('Should return created with statusCode 201 if request is valid', async () => {
    const { sut } = makeSut();

    const response = await sut.handle(fakeRequest);

    expect(response).toEqual(fakeResponse);
  });
});
