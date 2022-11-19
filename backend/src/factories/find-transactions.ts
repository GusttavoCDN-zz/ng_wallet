import { Controller } from '../controllers/Controller';
import { FindTransactions } from '../controllers/findTransactions/find-transactions';
import { HandleControllerErrorsDecorator } from '../decorators/HandleControllerErrorsDecorator';
import { PrismaTransactionsRepository } from '../repositories/implementations/prisma-transactions-repository';
import { FindTransactionsUseCase } from '../useCases/findTransactions/find-transactions';

export function makeFindTransactionsController(): Controller {
  const transactionsRepository = new PrismaTransactionsRepository();
  const findTransactionsUseCase = new FindTransactionsUseCase(transactionsRepository);
  const findTransactionsController = new FindTransactions(findTransactionsUseCase);

  return new HandleControllerErrorsDecorator(findTransactionsController);
}
