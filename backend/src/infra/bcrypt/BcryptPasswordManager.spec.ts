import { BcryptPassowrdManager } from './BcryptPasswordManager';

describe('PasswordManager test', () => {
  const salt = 12;
  const passwordManager = new BcryptPassowrdManager(salt);

  it('should encrypt a password correctly', async () => {
    const password = 'otaku';
    const hash = await passwordManager.encrypt(password);
    expect(hash).not.toBe(password);

    const isSame = await passwordManager.compare(password, hash);
    expect(isSame).toBe(true);
  });

  it('Should throw an error if hash throws', async () => {
    const passwordManager = new BcryptPassowrdManager(salt);
    jest.spyOn(passwordManager, 'encrypt').mockRejectedValueOnce(new Error());

    const promise = passwordManager.encrypt('any_password');

    await expect(promise).rejects.toThrow();
  });

  it('Should throw an error if compare throws', async () => {
    const passwordManager = new BcryptPassowrdManager(salt);
    jest.spyOn(passwordManager, 'compare').mockRejectedValueOnce(new Error());

    const promise = passwordManager.compare('any_password', 'any_hash');

    await expect(promise).rejects.toThrow();
  });
});
