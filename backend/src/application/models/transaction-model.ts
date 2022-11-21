export type TransactionModel = {
  id: number
  debitedAccountId: string
  creditedAccountId: string
  value: number
  createdAt: Date
};
