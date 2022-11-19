import { User } from '../../@types';
import { useLocalStorage } from '../../hooks/useStorage';
import { Header as StyledHeader } from './styles';

export function Header() {
  const [{ username }] = useLocalStorage<User>('user');

  return (
    <StyledHeader>
      <h1>NG Wallet</h1>
      <h2>{username}</h2>
      <button type="button">Nova Transação</button>
    </StyledHeader>
  );
}
