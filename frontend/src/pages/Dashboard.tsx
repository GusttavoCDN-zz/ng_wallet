import { Header } from '../components/Header';
import { Summary } from '../components/Summary';
import { TransactionModal } from '../components/TransactionModal';
import { TransactionsTable } from '../components/TransactionsTable';
import { TransactionModalProvider } from '../hooks/useTransactionModal';
import { TransactionsProvider } from '../hooks/useTransactions';

export function Dashboard() {
  return (
    <TransactionsProvider>
      <TransactionModalProvider>
        <Header />
        <Summary />
        <TransactionsTable />
        <TransactionModal />
      </TransactionModalProvider>
    </TransactionsProvider>
  );
}
