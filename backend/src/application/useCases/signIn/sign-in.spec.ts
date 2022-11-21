import { NotFoundError } from '../../../errors';
import { FindUserRepository, PasswordCompare, TokenGenerator } from '../../contracts';
import { SignInUseCase } from './sign-in';

const fakeUserResponse = {
  id: 'any_id',
  username: 'any_username',
  password: 'any_password',
  accountId: 'any_account_id'
};

const fakeRequest = {
  username: 'any_username',
  password: 'any_password'
};

type SutTypes = {
  sut: SignInUseCase
  usersRepositoryStub: jest.Mocked<FindUserRepository>
  passwordCompareStub: jest.Mocked<PasswordCompare>
  tokenGeneratorStub: jest.Mocked<TokenGenerator>
};

const makeSut = (): SutTypes => {
  const usersRepositoryStub: jest.Mocked<FindUserRepository> = {
    findByUsername: jest.fn().mockResolvedValue(fakeUserResponse)
  };
  const passwordCompareStub: jest.Mocked<PasswordCompare> = {
    compare: jest.fn().mockResolvedValue(true)
  };
  const tokenGeneratorStub: jest.Mocked<TokenGenerator> = {
    generate: jest.fn().mockResolvedValue('any_token')
  };

  const sut = new SignInUseCase(
    usersRepositoryStub,
    passwordCompareStub,
    tokenGeneratorStub
  );

  return { sut, usersRepositoryStub, passwordCompareStub, tokenGeneratorStub };
};

describe('SignIn use case controller', () => {
  it('Should call find with the correct value', async () => {
    const { sut, usersRepositoryStub } = makeSut();

    await sut.execute(fakeRequest);

    expect(usersRepositoryStub.findByUsername).toHaveBeenCalledWith(fakeRequest.username);
  });

  it('Should throw NotFound if users does not exists', async () => {
    const { sut, usersRepositoryStub } = makeSut();
    usersRepositoryStub.findByUsername.mockResolvedValueOnce(null);

    const promise = sut.execute(fakeRequest);

    await expect(promise).rejects.toThrow(NotFoundError);
  });

  it('Should call compare with the correct values', async () => {
    const { sut, passwordCompareStub } = makeSut();

    await sut.execute(fakeRequest);

    expect(passwordCompareStub.compare).toHaveBeenCalledWith(
      fakeRequest.password,
      fakeUserResponse.password
    );
  });

  it('Should throw NotFound if password is invalid', async () => {
    const { sut, passwordCompareStub } = makeSut();
    passwordCompareStub.compare.mockResolvedValueOnce(false);

    const promise = sut.execute(fakeRequest);

    await expect(promise).rejects.toThrow(NotFoundError);
  });

  it('Should call generate with the correct value', async () => {
    const { sut, tokenGeneratorStub } = makeSut();

    await sut.execute(fakeRequest);

    expect(tokenGeneratorStub.generate).toHaveBeenCalledWith({
      id: fakeUserResponse.id,
      username: fakeUserResponse.username,
      account: fakeUserResponse.accountId
    });
  });

  it('Should return UserAccessData if login is succeed', async () => {
    const { sut } = makeSut();

    const userData = await sut.execute(fakeRequest);

    expect(userData).toEqual({
      id: fakeUserResponse.id,
      username: fakeUserResponse.username,
      account: fakeUserResponse.accountId,
      token: 'any_token'
    });
  });
});
