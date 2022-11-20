import { Account } from '../@types';
import { httpRequest } from '../api/config';

export async function fetchBalance(account: string, token: string): Promise<number> {
  const { data } = await httpRequest.get<Account>(`/accounts/${account}`, {
    headers: { Authorization: token },
  });

  return data.balance;
}
