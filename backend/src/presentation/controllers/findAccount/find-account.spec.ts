import { AccountModel } from '../../../application/models/account-model';
import { FindAccountUseCase } from '../../../application/useCases';
import { HttpRequest } from '../../contracts';
import { FindAccount } from './find-account';

type SutTypes = {
  sut: FindAccount
  findAccountUseCaseStub: jest.Mocked<FindAccountUseCase>
};

const fakeAccountReponse: AccountModel = {
  id: 'accountId',
  balance: 100
};

const makeSut = (): SutTypes => {
  const findAccountUseCaseStub: jest.Mocked<FindAccountUseCase> = {
    execute: jest.fn().mockResolvedValue(fakeAccountReponse)
  } as any;

  const sut = new FindAccount(findAccountUseCaseStub);

  return { sut, findAccountUseCaseStub };
};

describe('FindAccount controller test', () => {
  const httpRequest: HttpRequest = {
    params: { accountId: 'accountId' },
    body: {}
  };

  it('Should call execute with correct value', async () => {
    const { sut, findAccountUseCaseStub } = makeSut();

    await sut.handle(httpRequest);

    expect(findAccountUseCaseStub.execute).toHaveBeenCalledWith('accountId');
  });

  it('Should return 200 if account is found', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual(fakeAccountReponse);
  });
});
