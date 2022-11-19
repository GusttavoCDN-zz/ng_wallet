import { Container } from './styles';
import incomeImg from '../../assets/cashIn.svg';
import outcomeImg from '../../assets/cashOut.svg';
import totalImg from '../../assets/currency.svg';

export function Summary() {
  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>RS$1000</strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>RS$1000</strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>RS$1000</strong>
      </div>
    </Container>
  );
}
