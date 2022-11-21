import { NotFoundError } from '../../../errors';
import {
  FindAccountRepository,
  FindUserRepository,
  MakeTransactionRepository
} from '../../contracts';
import { AccountModel } from '../../models/account-model';
import { UserModel } from '../../models/user-model';
import { CreateTransactionUseCase } from './create-transaction';

type SutTypes = {
  sut: CreateTransactionUseCase
  accountsRepositoryStub: jest.Mocked<FindAccountRepository & MakeTransactionRepository>
  usersRepositoryStub: jest.Mocked<FindUserRepository>
};

const fakeAccountResponseOne: AccountModel = {
  id: '1',
  balance: 100
};

const fakeAccountResponseTwo: AccountModel = {
  id: '2',
  balance: 100
};

const fakeUserResponse: UserModel = {
  id: 1,
  username: 'any_username',
  password: 'any_password',
  accountId: fakeAccountResponseTwo.id
};

const makeSut = (): SutTypes => {
  const accountsRepositoryStub: jest.Mocked<
  FindAccountRepository & MakeTransactionRepository
  > = {
    find: jest.fn(),
    makeTransaction: jest.fn()
  };
  const usersRepositoryStub: jest.Mocked<FindUserRepository> = {
    findByUsername: jest.fn().mockResolvedValue(fakeUserResponse)
  };
  const sut = new CreateTransactionUseCase(accountsRepositoryStub, usersRepositoryStub);

  return { sut, accountsRepositoryStub, usersRepositoryStub };
};

describe('Create transaction use case test', () => {
  it('Should call find with the correct values', async () => {
    const { sut, accountsRepositoryStub } = makeSut();

    accountsRepositoryStub.find.mockResolvedValueOnce(fakeAccountResponseOne);
    accountsRepositoryStub.find.mockResolvedValueOnce(fakeAccountResponseTwo);

    await sut.execute({
      amount: 100,
      debitedAccount: '1',
      creditedUsername: 'any_username'
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
      creditedUsername: 'any_username'
    });

    await expect(promise).rejects.toThrowError(NotFoundError);
  });

  it('Should throw NotFound if find does not find the credited account', async () => {
    const { sut, accountsRepositoryStub, usersRepositoryStub } = makeSut();

    accountsRepositoryStub.find.mockResolvedValueOnce(fakeAccountResponseOne);
    usersRepositoryStub.findByUsername.mockResolvedValueOnce(null);

    const promise = sut.execute({
      amount: 100,
      debitedAccount: '1',
      creditedUsername: 'any_username'
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
      creditedUsername: '2'
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
      creditedUsername: 'any_username'
    });

    await expect(promise).rejects.toThrow();
  });
});
