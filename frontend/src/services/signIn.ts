import { UserCredentials } from '../@types';
import { httpRequest } from '../api/config';

export async function signInRequest({ username, password }: UserCredentials) {
  const { data } = await httpRequest.post('/signin', { username, password });
  localStorage.setItem('user', JSON.stringify(data));
  return data;
}
