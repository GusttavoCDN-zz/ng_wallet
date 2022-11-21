import { FindAccountUseCase } from '../../application/useCases';
import { PrismaAccountsRepository } from '../../infra/database/repositories/prisma-accounts-repository';
import { Controller } from '../../presentation/contracts';
import { FindAccount } from '../../presentation/controllers';
import { HandleControllerErrorsDecorator } from '../decorators/HandleControllerErrorsDecorator';

export function makeFindAccountController(): Controller {
  const accountsRepository = new PrismaAccountsRepository();
  const findAccountUseCase = new FindAccountUseCase(accountsRepository);
  const findAccountController = new FindAccount(findAccountUseCase);

  return new HandleControllerErrorsDecorator(findAccountController);
}
