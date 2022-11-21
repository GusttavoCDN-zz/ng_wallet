import { Account } from '../@types';
import { httpRequest } from '../api/config';

export async function fetchBalance(token: string): Promise<number> {
  const { data } = await httpRequest.get<Account>('/account', {
    headers: { Authorization: token },
  });

  return data.balance;
}
