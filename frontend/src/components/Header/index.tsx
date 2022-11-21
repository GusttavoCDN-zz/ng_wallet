import { useNavigate } from 'react-router-dom';
import { User } from '../../@types';
import { useTransactionModal } from '../../hooks/useTransactionModal';
import { useLocalStorage } from '../../hooks/useStorage';
import { Header as StyledHeader } from './styles';

export function Header() {
  const [{ username }, , removeUser] = useLocalStorage<User>('user');
  const { toggleModal } = useTransactionModal();

  const navigate = useNavigate();

  const handleLogout = () => {
    removeUser();
    navigate('/signin');
  };

  return (
    <StyledHeader>
      <h1>NG Wallet</h1>
      <h2>{username}</h2>
      <button type="button" onClick={toggleModal}>
        Nova Transação
      </button>
      <button type="button" onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </StyledHeader>
  );
}
