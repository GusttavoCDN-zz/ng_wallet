import { CreateTransactionUseCase } from '../../application/useCases';
import { PrismaAccountsRepository } from '../../infra/database/repositories/prisma-accounts-repository';
import { PrismaUsersRepository } from '../../infra/database/repositories/prisma-users-repository';
import { JoiRequestValidator } from '../../infra/joi/validations/JoiRequestValidator';
import { createTransactionSchema } from '../../infra/joi/validations/schemas';
import { Controller } from '../../presentation/contracts';
import { CreateTransaction } from '../../presentation/controllers';
import { HandleControllerErrorsDecorator } from '../decorators/HandleControllerErrorsDecorator';

export function makeCreateTransactionController(): Controller {
  const accountRepository = new PrismaAccountsRepository();
  const usersRepository = new PrismaUsersRepository();
  const createTransactionUseCase = new CreateTransactionUseCase(
    accountRepository,
    usersRepository
  );

  const requestValidator = new JoiRequestValidator(createTransactionSchema);
  const createTransactionController = new CreateTransaction(
    createTransactionUseCase,
    requestValidator
  );

  return new HandleControllerErrorsDecorator(createTransactionController);
}
