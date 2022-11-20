import { useState } from 'react';
import Modal from 'react-modal';
import { useTransactionModal } from '../../hooks/useTransactionModal';
import { StyledForm } from './styles';

Modal.setAppElement('#root');

export function TransactionModal() {
  const [receiver, setReceiver] = useState('');
  const [value, setValue] = useState(0);

  const { isOpen, toggleModal } = useTransactionModal();
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={toggleModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <StyledForm>
        <h2>Nova Transação</h2>
        <input
          type="text"
          placeholder="Recebedor"
          value={receiver}
          onChange={({ target }) => setReceiver(target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={({ target }) => setValue(Number(target.value))}
        />
        <button type="submit">Transferir</button>
      </StyledForm>
    </Modal>
  );
}
