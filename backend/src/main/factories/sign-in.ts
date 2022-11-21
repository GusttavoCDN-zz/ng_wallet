import { SignInUseCase } from '../../application/useCases';
import { BcryptPassowrdManager } from '../../infra/bcrypt/BcryptPasswordManager';
import { PrismaUsersRepository } from '../../infra/database/repositories/prisma-users-repository';
import { JoiRequestValidator } from '../../infra/joi/validations/JoiRequestValidator';
import { userCredentialsSchema } from '../../infra/joi/validations/schemas';
import { JwtTokenGenerator } from '../../infra/jwt/JwtTokenGenerator';
import { Controller } from '../../presentation/contracts';
import { SignIn } from '../../presentation/controllers';
import { HandleControllerErrorsDecorator } from '../decorators/HandleControllerErrorsDecorator';

export function makeSignInController(): Controller {
  const usersRepository = new PrismaUsersRepository();
  const passwordManager = new BcryptPassowrdManager(10);
  const tokenGenerator = new JwtTokenGenerator();

  const signInUseCase = new SignInUseCase(
    usersRepository,
    passwordManager,
    tokenGenerator
  );

  const requestValidator = new JoiRequestValidator(userCredentialsSchema);
  const signInController = new SignIn(signInUseCase, requestValidator);

  return new HandleControllerErrorsDecorator(signInController);
}
