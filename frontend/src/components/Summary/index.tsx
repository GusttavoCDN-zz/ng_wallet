import { useEffect, useState } from 'react';
import { Container } from './styles';
import incomeImg from '../../assets/cashIn.svg';
import outcomeImg from '../../assets/cashOut.svg';
import totalImg from '../../assets/currency.svg';
import { useLocalStorage } from '../../hooks/useStorage';
import { User } from '../../@types';
import { formatNumber } from '../../utils/format';
import { useTransactions } from '../../hooks/useTransactions';
import { fetchBalance } from '../../services/fetchBalance';

type AccountSumary = {
  income: number;
  outcome: number;
};

export function Summary() {
  const [balance, setBalance] = useState(0);
  const [{ token, username, account }] = useLocalStorage<User>('user');
  const { transactions } = useTransactions();

  const accountSummary = transactions.reduce<AccountSumary>(
    (acc, transaction) => {
      if (transaction.debitedAccountId === account) acc.outcome += transaction.value;
      else acc.income += transaction.value;
      return acc;
    },
    { income: 0, outcome: 0 },
  );

  useEffect(() => {
    const fetch = async () => {
      const accountBalance = await fetchBalance(token);
      setBalance(accountBalance);
    };
    fetch();
  }, [token, username, transactions]);

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>{formatNumber(accountSummary.income)}</strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>{formatNumber(accountSummary.outcome)}</strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Saldo</p>
          <img src={totalImg} alt="Saldo" />
        </header>
        <strong>{formatNumber(balance)}</strong>
      </div>
    </Container>
  );
}
