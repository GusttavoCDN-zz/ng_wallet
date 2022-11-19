import { Controller } from '../controllers/Controller';
import { CreateTransaction } from '../controllers/createTransaction/create-transaction';
import { HandleControllerErrorsDecorator } from '../decorators/HandleControllerErrorsDecorator';
import { PrismaAccountsRepository } from '../repositories/implementations/prisma-accounts-repository';
import { CreateTransactionUseCase } from '../useCases/createTransaction/create-transaction';
import { JoiRequestValidator } from '../validations/JoiRequestValidator';
import { createTransactionSchema } from '../validations/schemas';

export function makeCreateTransactionController(): Controller {
  const accountRepository = new PrismaAccountsRepository();
  const createTransactionUseCase = new CreateTransactionUseCase(accountRepository);

  const requestValidator = new JoiRequestValidator(createTransactionSchema);
  const createTransactionController = new CreateTransaction(
    createTransactionUseCase,
    requestValidator
  );

  return new HandleControllerErrorsDecorator(createTransactionController);
}
