import { useEffect, useState } from 'react';
import { Container } from './styles';
import incomeImg from '../../assets/cashIn.svg';
import outcomeImg from '../../assets/cashOut.svg';
import totalImg from '../../assets/currency.svg';
import { useLocalStorage } from '../../hooks/useStorage';
import { User } from '../../@types';
import { httpRequest } from '../../api/config';
import { formatNumber } from '../../utils/format';

export function Summary() {
  const [balance, setBalance] = useState(0);
  const [{ token, account }] = useLocalStorage<User>('user');

  useEffect(() => {
    const fetchBalance = async () => {
      const { data } = await httpRequest.get(`/accounts/${account}`, {
        headers: {
          Authorization: token,
        },
      });
      setBalance(data.balance);
    };
    fetchBalance();
  }, [token, account]);

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
        <strong>{formatNumber(balance)}</strong>
      </div>
    </Container>
  );
}
