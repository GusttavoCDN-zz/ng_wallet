import { CreateTransactionUseCase } from '../../../application/useCases';
import { InvalidRequestError } from '../../../errors';
import { HttpRequest, RequestValidator } from '../../contracts';
import { CreateTransaction } from './create-transaction';

type SutTypes = {
  sut: CreateTransaction
  createTransactionUseCaseStub: jest.Mocked<CreateTransactionUseCase>
  requestValidatorStub: jest.Mocked<RequestValidator>
};

const makeSut = (): SutTypes => {
  const createTransactionUseCaseStub: jest.Mocked<CreateTransactionUseCase> = {
    execute: jest.fn()
  } as any;
  const requestValidatorStub: jest.Mocked<RequestValidator> = {
    validate: jest.fn().mockResolvedValue(true)
  };
  const sut = new CreateTransaction(createTransactionUseCaseStub, requestValidatorStub);

  return { sut, createTransactionUseCaseStub, requestValidatorStub };
};

describe('CreateTransaction controller test', () => {
  const httpRequest: HttpRequest = {
    body: {
      amount: 100,
      debitedAccount: '1',
      creditedAccount: '2'
    }
  };

  it('Should call validate with the body request', async () => {
    const { sut, requestValidatorStub } = makeSut();

    await sut.handle(httpRequest);

    expect(requestValidatorStub.validate).toHaveBeenCalledWith(httpRequest.body);
  });

  it('Should throw InvalidRequest if validation fails', async () => {
    const { sut, requestValidatorStub } = makeSut();
    requestValidatorStub.validate.mockResolvedValue(false);

    await expect(sut.handle(httpRequest)).rejects.toThrowError(InvalidRequestError);
  });

  it('Should call createTransactionUseCase with the body request', async () => {
    const { sut, createTransactionUseCaseStub } = makeSut();

    await sut.handle(httpRequest);

    expect(createTransactionUseCaseStub.execute).toHaveBeenCalledWith(httpRequest.body);
  });

  it('Should return 201 if createTransactionUseCase succeeds', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual({
      statusCode: 201,
      body: { message: 'Transaction created' }
    });
  });

  it('Should throw if createTransactionUseCase throws', async () => {
    const { sut, createTransactionUseCaseStub } = makeSut();
    createTransactionUseCaseStub.execute.mockRejectedValueOnce(new Error());

    await expect(sut.handle(httpRequest)).rejects.toThrow();
  });
});
