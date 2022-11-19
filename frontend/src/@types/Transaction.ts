export type Transaction = {
  id: number;
  debitedAccountId: string;
  creditedAccountId: string;
  value: number;
  createdAt: string;
};
