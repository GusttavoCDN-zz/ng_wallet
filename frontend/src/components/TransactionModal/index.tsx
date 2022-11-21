import { useState } from 'react';
import Modal from 'react-modal';
import { useTransactionModal } from '../../hooks/useTransactionModal';
import { useTransactions } from '../../hooks/useTransactions';
import { StyledForm } from './styles';

Modal.setAppElement('#root');

export function TransactionModal() {
  const [receiver, setReceiver] = useState('');
  const [value, setValue] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const { isOpen, toggleModal } = useTransactionModal();
  const { createTransaction } = useTransactions();

  const handleCreateNewTransaction = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await createTransaction({ receiver, value });
      setReceiver('');
      setValue(0);
      toggleModal();
    } catch (error: any) {
      setErrorMsg('Erro ao criar transação. Verique o nome do recebor e saldo da sua conta');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={toggleModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <StyledForm onSubmit={handleCreateNewTransaction}>
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
        {errorMsg && <p>{errorMsg}</p>}
      </StyledForm>
    </Modal>
  );
}
