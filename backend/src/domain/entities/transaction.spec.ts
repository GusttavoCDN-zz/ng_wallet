import { InvalidRequestError } from '../../errors';
import { Transaction } from './transaction';

describe('Transaction entity test', () => {
  it('Should throw an exception if debited account and credited account are equal', async () => {
    const debitedAccount = { id: '1', balance: 100 };
    const creditedAccount = debitedAccount;

    expect(() => {
      Transaction.create({
        amount: 100,
        debitedAccount,
        creditedAccount
      });
    }).toThrow(InvalidRequestError);
  });

  it('Should throw an exception if amount is greater than account balance', async () => {
    const debitedAccount = { id: '1', balance: 100 };
    const creditedAccount = { id: '2', balance: 100 };

    expect(() => {
      Transaction.create({
        amount: 200,
        debitedAccount,
        creditedAccount
      });
    }).toThrow(InvalidRequestError);
  });

  it('Should throw an exception if amount is less than or equal 0', async () => {
    const debitedAccount = { id: '1', balance: 100 };
    const creditedAccount = { id: '2', balance: 100 };

    expect(() => {
      Transaction.create({
        amount: 0,
        debitedAccount,
        creditedAccount
      });
    }).toThrow(InvalidRequestError);

    expect(() => {
      Transaction.create({
        amount: -1,
        debitedAccount,
        creditedAccount
      });
    }).toThrow(InvalidRequestError);
  });

  it('Should create a transaction', async () => {
    const debitedAccount = { id: '1', balance: 100 };
    const creditedAccount = { id: '2', balance: 100 };

    const transaction = Transaction.create({
      amount: 50,
      debitedAccount,
      creditedAccount
    });

    expect(transaction).toEqual({
      amount: 50,
      debitedAccount,
      creditedAccount
    });
  });
});
