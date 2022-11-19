import { Controller } from '../controllers/Controller';
import { SignIn } from '../controllers/signIn/sign-in';
import { HandleControllerErrorsDecorator } from '../decorators/HandleControllerErrorsDecorator';
import { PrismaUsersRepository } from '../repositories/implementations/prisma-users-repository';
import { SignInUseCase } from '../useCases/signIn/sign-in';
import { BcryptPassowrdManager } from '../utils/BcryptPasswordManager';
import { JwtTokenGenerator } from '../utils/JwtTokenGenerator';
import { JoiRequestValidator } from '../validations/JoiRequestValidator';
import { userCredentialsSchema } from '../validations/schemas';

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
