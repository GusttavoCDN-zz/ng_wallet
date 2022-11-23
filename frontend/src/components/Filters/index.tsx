import { Container } from './styles';

type FilterProps = {
  changeType: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  type: string;
  date: string;
  changeDate: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Filters({ changeType, type, changeDate, date }: FilterProps) {
  return (
    <Container>
      <div>
        <label htmlFor="transactionType">Tipo</label>
        <select name="transactionType" value={type} onChange={changeType}>
          <option value="all">Todas</option>
          <option value="cashIn">Entrada</option>
          <option value="cashOut">Saída</option>
        </select>
      </div>
      <div>
        <label htmlFor="date">Data</label>
        <input type="date" value={date} onChange={changeDate} />
      </div>
    </Container>
  );
}
