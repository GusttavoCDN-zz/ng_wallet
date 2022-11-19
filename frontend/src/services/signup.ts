import { UserCredentials } from '../@types';
import { httpRequest } from '../api/config';

export async function signUpRequest({ username, password }: UserCredentials) {
  const { data } = await httpRequest.post('/users', { username, password });
  return data;
}
