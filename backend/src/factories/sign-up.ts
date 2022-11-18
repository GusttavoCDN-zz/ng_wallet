import { Controller } from '../controllers/Controller';
import { Signup } from '../controllers/Signup/sign-up';
import { PrismaUsersRepository } from '../repositories/implementations/prisma-users-repository';
import { SignupUseCase } from '../useCases/signup/sign-up';
import { BcryptPassowrdManager } from '../utils/BcryptPasswordManager';
import { JoiRequestValidator } from '../validations/JoiRequestValidator';
import { userCredentialsSchema } from '../validations/schemas';

export function makeSignUpController(): Controller {
  const salt = 10;

  const usersRepository = new PrismaUsersRepository();
  const passwordManager = new BcryptPassowrdManager(salt);
  const signUpUseCase = new SignupUseCase(usersRepository, passwordManager);

  const requestValidator = new JoiRequestValidator(userCredentialsSchema);
  const signUpController = new Signup(signUpUseCase, requestValidator);

  return signUpController;
}
