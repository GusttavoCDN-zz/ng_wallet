import { NotFoundError } from '../../../errors';
import { FindAccountRepository, MakeTransactionRepository } from '../../contracts';
import { AccountModel } from '../../models/account-model';
import { CreateTransactionUseCase } from './create-transaction';

type SutTypes = {
  sut: CreateTransactionUseCase
  accountsRepositoryStub: jest.Mocked<FindAccountRepository & MakeTransactionRepository>
};

const fakeAccountResponseOne: AccountModel = {
  id: '1',
  balance: 100
};

const fakeAccountResponseTwo: AccountModel = {
  id: '2',
  balance: 100
};

const makeSut = (): SutTypes => {
  const accountsRepositoryStub: jest.Mocked<
  FindAccountRepository & MakeTransactionRepository
  > = {
    find: jest.fn(),
    makeTransaction: jest.fn()
  };
  const sut = new CreateTransactionUseCase(accountsRepositoryStub);

  return { sut, accountsRepositoryStub };
};

describe('Create transaction use case test', () => {
  it('Should call find with the correct values', async () => {
    const { sut, accountsRepositoryStub } = makeSut();

    accountsRepositoryStub.find.mockResolvedValueOnce(fakeAccountResponseOne);
    accountsRepositoryStub.find.mockResolvedValueOnce(fakeAccountResponseTwo);

    await sut.execute({
      amount: 100,
      debitedAccount: '1',
      creditedAccount: '2'
    });

    expect(accountsRepositoryStub.find).toHaveBeenNthCalledWith(1, '1');
    expect(accountsRepositoryStub.find).toHaveBeenNthCalledWith(2, '2');
  });

  it('Should throw NotFound if find does not find the debited account', async () => {
    const { sut, accountsRepositoryStub } = makeSut();

    accountsRepositoryStub.find.mockResolvedValueOnce(null);

    const promise = sut.execute({
      amount: 100,
      debitedAccount: '1',
      creditedAccount: '2'
    });

    await expect(promise).rejects.toThrowError(NotFoundError);
  });

  it('Should throw NotFound if find does not find the credited account', async () => {
    const { sut, accountsRepositoryStub } = makeSut();

    accountsRepositoryStub.find.mockResolvedValueOnce(fakeAccountResponseOne);
    accountsRepositoryStub.find.mockResolvedValueOnce(null);

    const promise = sut.execute({
      amount: 100,
      debitedAccount: '1',
      creditedAccount: '2'
    });

    await expect(promise).rejects.toThrowError(NotFoundError);
  });

  it('Should call makeTransaction with the correct values', async () => {
    const { sut, accountsRepositoryStub } = makeSut();

    accountsRepositoryStub.find.mockResolvedValueOnce(fakeAccountResponseOne);
    accountsRepositoryStub.find.mockResolvedValueOnce(fakeAccountResponseTwo);

    await sut.execute({
      amount: 100,
      debitedAccount: '1',
      creditedAccount: '2'
    });

    expect(accountsRepositoryStub.makeTransaction).toHaveBeenCalledWith({
      debitedAccount: '1',
      creditedAccount: '2',
      amount: 100
    });
  });

  it('Should throw if makeTransaction throws', async () => {
    const { sut, accountsRepositoryStub } = makeSut();

    accountsRepositoryStub.find.mockResolvedValueOnce(fakeAccountResponseOne);
    accountsRepositoryStub.find.mockResolvedValueOnce(fakeAccountResponseTwo);
    accountsRepositoryStub.makeTransaction.mockRejectedValueOnce(new Error());

    const promise = sut.execute({
      amount: 100,
      debitedAccount: '1',
      creditedAccount: '2'
    });

    await expect(promise).rejects.toThrow();
  });
});
