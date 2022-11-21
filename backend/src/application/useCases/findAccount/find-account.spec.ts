import { FindAccountRepository } from '../../contracts';
import { AccountModel } from '../../models/account-model';
import { FindAccountUseCase } from './find-account';

type SutTypes = {
  sut: FindAccountUseCase
  findAccountRepositoryStub: jest.Mocked<FindAccountRepository>
};

const fakeAccountReponse: AccountModel = {
  id: 'accountId',
  balance: 100
};

const makeSut = (): SutTypes => {
  const findAccountRepositoryStub: jest.Mocked<FindAccountRepository> = {
    find: jest.fn().mockResolvedValue(fakeAccountReponse)
  };

  const sut = new FindAccountUseCase(findAccountRepositoryStub);

  return { sut, findAccountRepositoryStub };
};

describe('Find Account use case test', () => {
  it('Should call find with correct value', async () => {
    const { sut, findAccountRepositoryStub } = makeSut();

    await sut.execute('accountId');

    expect(findAccountRepositoryStub.find).toHaveBeenCalledWith('accountId');
  });

  it('Should throw NotFound if account does not exists', async () => {
    const { sut, findAccountRepositoryStub } = makeSut();

    findAccountRepositoryStub.find.mockResolvedValueOnce(null);

    await expect(sut.execute('accountId')).rejects.toThrowError();
  });

  it('Should return an account if find succeeds', async () => {
    const { sut } = makeSut();

    const account = await sut.execute('accountId');

    expect(account).toEqual(fakeAccountReponse);
  });
});
