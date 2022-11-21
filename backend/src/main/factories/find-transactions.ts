import { FindTransactionsUseCase } from '../../application/useCases';
import { PrismaTransactionsRepository } from '../../infra/database/repositories/prisma-transactions-repository';
import { Controller } from '../../presentation/contracts';
import { FindTransactions } from '../../presentation/controllers';
import { HandleControllerErrorsDecorator } from '../decorators/HandleControllerErrorsDecorator';

export function makeFindTransactionsController(): Controller {
  const transactionsRepository = new PrismaTransactionsRepository();
  const findTransactionsUseCase = new FindTransactionsUseCase(transactionsRepository);
  const findTransactionsController = new FindTransactions(findTransactionsUseCase);

  return new HandleControllerErrorsDecorator(findTransactionsController);
}
