import { SignupUseCase } from '../../application/useCases';
import { BcryptPassowrdManager } from '../../infra/bcrypt/BcryptPasswordManager';
import { PrismaUsersRepository } from '../../infra/database/repositories/prisma-users-repository';
import { JoiRequestValidator } from '../../infra/joi/validations/JoiRequestValidator';
import { userCredentialsSchema } from '../../infra/joi/validations/schemas';
import { Controller } from '../../presentation/contracts';
import { Signup } from '../../presentation/controllers';
import { HandleControllerErrorsDecorator } from '../decorators/HandleControllerErrorsDecorator';

export function makeSignUpController(): Controller {
  const salt = 10;

  const usersRepository = new PrismaUsersRepository();
  const passwordManager = new BcryptPassowrdManager(salt);
  const signUpUseCase = new SignupUseCase(usersRepository, passwordManager);

  const requestValidator = new JoiRequestValidator(userCredentialsSchema);
  const signUpController = new Signup(signUpUseCase, requestValidator);

  return new HandleControllerErrorsDecorator(signUpController);
}
