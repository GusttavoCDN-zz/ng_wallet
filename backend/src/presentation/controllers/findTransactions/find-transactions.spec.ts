import { TransactionModel } from '../../../application/models/transaction-model';
import { FindTransactionsUseCase } from '../../../application/useCases';
import { HttpRequest } from '../../contracts';
import { FindTransactions } from './find-transactions';

type SutTypes = {
  sut: FindTransactions
  findTransactionsUseCaseStub: jest.Mocked<FindTransactionsUseCase>
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
  const findTransactionsUseCaseStub: jest.Mocked<FindTransactionsUseCase> = {
    execute: jest.fn().mockResolvedValue(fakeTransactionsReponse)
  } as any;

  const sut = new FindTransactions(findTransactionsUseCaseStub);

  return { sut, findTransactionsUseCaseStub };
};

describe('FindTransactions controller test', () => {
  const httpRequest: HttpRequest = {
    body: {},
    user: { id: 1, username: 'username', account: 'accountId' }
  };

  it('Should respond with statusCode 200 and a arry of transactions on body', async () => {
    const { sut } = makeSut();

    const response = await sut.handle(httpRequest);

    expect(response).toEqual({
      statusCode: 200,
      body: fakeTransactionsReponse
    });
  });
});
