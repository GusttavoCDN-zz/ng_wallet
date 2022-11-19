import { Header } from '../components/Header';
import { Summary } from '../components/Summary';
import { TransactionsTable } from '../components/TransactionsTable';

export function Dashboard() {
  return (
    <>
      <Header />
      <Summary />
      <TransactionsTable />
    </>
  );
}
