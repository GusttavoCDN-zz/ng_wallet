import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { User, Transaction } from '../@types';
import { httpRequest } from '../api/config';
import { useLocalStorage } from './useStorage';

type TransactionsContextData = {
  transactions: Transaction[];
};

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

type TransactionsProviderProps = {
  children: React.ReactNode;
};

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [{ account, token }] = useLocalStorage<User>('user');

  const fetchTransactions = useCallback(async () => {
    const { data } = await httpRequest.get(`/transactions/${account}`, {
      headers: { Authorization: token },
    });
    setTransactions(data);
  }, [account, token]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const contextValues = useMemo(() => ({ transactions }), [transactions]);

  return <TransactionsContext.Provider value={contextValues}>{children}</TransactionsContext.Provider>;
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  return context;
}
