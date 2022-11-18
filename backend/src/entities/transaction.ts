import { Account } from './account';

type TransactionsProps = {
  amount: number
  debitedAccount: Account
  creditedAccount: Account
};

export class Transaction {
  public readonly debitedAccount: Account;
  public readonly creditedAccount: Account;
  public readonly amount: number;

  private constructor(props: TransactionsProps) {
    this.debitedAccount = props.debitedAccount;
    this.creditedAccount = props.creditedAccount;
    this.amount = props.amount;
  }

  static create = (data: TransactionsProps): Transaction => {
    this.validateTransationCreationData(data);

    const transaction = new Transaction(data);
    return transaction;
  };

  private static readonly validateTransationCreationData = ({
    amount,
    creditedAccount,
    debitedAccount
  }: TransactionsProps): void => {
    if (creditedAccount.id === debitedAccount.id) {
      throw new Error('You cannot make a transaction to your own account');
    }

    if (amount > debitedAccount.balance) {
      throw new Error('You do not have enough balance to make this transaction');
    }

    if (amount <= 0) {
      throw new Error('The amount must be greater than zero');
    }
  };
}
