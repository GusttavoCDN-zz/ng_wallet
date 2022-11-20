import { User } from '../../@types';
import { useTransactionModal } from '../../hooks/useTransactionModal';
import { useLocalStorage } from '../../hooks/useStorage';
import { Header as StyledHeader } from './styles';

export function Header() {
  const [{ username }] = useLocalStorage<User>('user');
  const { toggleModal } = useTransactionModal();

  return (
    <StyledHeader>
      <h1>NG Wallet</h1>
      <h2>{username}</h2>
      <button type="button" onClick={toggleModal}>
        Nova Transação
      </button>
    </StyledHeader>
  );
}
