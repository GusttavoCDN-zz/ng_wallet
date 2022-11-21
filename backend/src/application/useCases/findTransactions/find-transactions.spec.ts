import { FindTransactionsRepository } from '../../contracts';
import { TransactionModel } from '../../models/transaction-model';
import { FindTransactionsUseCase } from './find-transactions';

type SutTypes = {
  sut: FindTransactionsUseCase
  transactionsRepositoryStub: jest.Mocked<FindTransactionsRepository>
};

const fakeTransactionsReponse: TransactionModel[] = [
  {
    id: 1,
    creditedAccountId: 'creditedAccountId',
    debitedAccountId: 'debitedAccountId',
    value: 100,
    createdAt: new Date()
  },
  {
    id: 2,
    creditedAccountId: 'creditedAccountId',
    debitedAccountId: 'debitedAccountId',
    value: 100,
    createdAt: new Date()
  }
];

const makeSut = (): SutTypes => {
  const transactionsRepositoryStub: jest.Mocked<FindTransactionsRepository> = {
    find: jest.fn().mockResolvedValue(fakeTransactionsReponse)
  };

  const sut = new FindTransactionsUseCase(transactionsRepositoryStub);

  return { sut, transactionsRepositoryStub };
};

describe('FindTransactions use case test', () => {
  it('Should return an array with transactions', async () => {
    const { sut } = makeSut();

    const transactions = await sut.execute('accountId');

    expect(transactions).toEqual(fakeTransactionsReponse);
    expect(transactions.length).toBe(2);
  });
});
