import { createContext, useCallback, useContext, useMemo, useState } from 'react';

type TransactionModalContextData = {
  isOpen: boolean;
  toggleModal: () => void;
};

const TransactionModalContext = createContext<TransactionModalContextData>({} as TransactionModalContextData);

type Props = {
  children: React.ReactNode;
};

export function TransactionModalProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const contextValues = useMemo(() => ({ isOpen, toggleModal }), [isOpen, toggleModal]);

  return <TransactionModalContext.Provider value={contextValues}>{children}</TransactionModalContext.Provider>;
}

export function useTransactionModal() {
  const context = useContext(TransactionModalContext);
  return context;
}
