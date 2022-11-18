import { Controller } from '../controllers/Controller';
import { FindAccount } from '../controllers/findAccount/find-account';
import { PrismaAccountsRepository } from '../repositories/implementations/prisma-accounts-repository';
import { FindAccountUseCase } from '../useCases/findAccount/find-account';

export function makeFindAccountController(): Controller {
  const accountsRepository = new PrismaAccountsRepository();
  const findAccountUseCase = new FindAccountUseCase(accountsRepository);
  const findAccountController = new FindAccount(findAccountUseCase);

  return findAccountController;
}
