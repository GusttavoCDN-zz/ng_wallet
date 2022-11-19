import { User } from '../../@types';
import { useLocalStorage } from '../../hooks/useStorage';
import { useTransactions } from '../../hooks/useTransactions';
import { formatDate, formatNumber } from '../../utils/format';
import { Container } from './styles';

export function TransactionsTable() {
  const { transactions } = useTransactions();
  const [{ account }] = useLocalStorage<User>('user');

  return (
    <Container>
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
          {transactions.map((transaction) => {
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
