import { useState } from 'react';
import { Transaction, User } from '../../@types';
import { useLocalStorage } from '../../hooks/useStorage';
import { useTransactions } from '../../hooks/useTransactions';
import { formatDate, formatNumber } from '../../utils/format';
import { Filters } from '../Filters';
import { Container } from './styles';

export function TransactionsTable() {
  const [transactionType, setTransactionType] = useState('all');
  const [date, setDate] = useState('');

  const { transactions } = useTransactions();
  const [{ account }] = useLocalStorage<User>('user');

  const filterTransactionsByType = (transactions: Transaction[]) => {
    if (transactionType === 'all') return transactions;
    return transactions.filter((transaction) => {
      const type = transaction.debitedAccountId === account ? 'cashOut' : 'cashIn';
      return type === transactionType;
    });
  };

  const filterTransactionsByDate = (transactions: Transaction[]) => {
    if (!date) return transactions;
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.createdAt);
      const currentDate = new Date(`${date}T00:00:00`);

      return formatDate(transactionDate.toLocaleString()) === formatDate(currentDate.toLocaleString());
    });
  };

  const filteredTransactions = (transactions: Transaction[]) => {
    const transactionsByType = filterTransactionsByType(transactions);
    return filterTransactionsByDate(transactionsByType);
  };

  const handleChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTransactionType(event.target.value);
  };

  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  return (
    <Container>
      <Filters changeType={handleChangeType} type={transactionType} date={date} changeDate={handleChangeDate} />
      <table>
        <thead>
          <tr>
            <th>Conta debitada</th>
            <th>Conta creditada</th>
            <th>Valor</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions(transactions).map((transaction) => {
            const type = transaction.debitedAccountId === account ? 'cashOut' : 'cashIn';
            return (
              <tr key={transaction.id}>
                <td>{transaction.debitedAccountId}</td>
                <td>{transaction.creditedAccountId}</td>
                <td className={type}>{formatNumber(transaction.value)}</td>
                <td>{formatDate(transaction.createdAt)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
}
