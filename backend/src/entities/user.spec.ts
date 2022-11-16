import crypto from 'crypto';
import { User } from './user';

describe('User entity test', () => {
  it('Should assign the randoms UUID`S generated to the correct properties', () => {
    jest
      .spyOn(crypto, 'randomUUID')
      .mockReturnValueOnce('random-uuid-1')
      .mockReturnValueOnce('random-uuid-2');

    const user = new User({
      username: 'any_username',
      password: 'any_password'
    });

    expect(user.id).toBe('random-uuid-1');
    expect(user.accountId).toBe('random-uuid-2');
  });
});
