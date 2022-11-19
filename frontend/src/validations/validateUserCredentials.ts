import { UserCredentials } from '../@types';

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

export function validateUserCredentials({ username, password }: UserCredentials): boolean {
  const errors = [username.length > 3, PASSWORD_REGEX.test(password)];
  return errors.every((error) => error);
}
