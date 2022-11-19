import { Router } from 'express';
import { makeCreateTransactionController } from '../../factories/create-transaction';
import { makeFindAccountController } from '../../factories/find-account';
import { makeFindTransactionsController } from '../../factories/find-transactions';
import { adaptRoute } from '../config/adapter';

const accountsRouter = Router();

accountsRouter.post('/transactions', adaptRoute(makeCreateTransactionController()));

accountsRouter.get(
  '/transactions/:accountId',
  adaptRoute(makeFindTransactionsController())
);

accountsRouter.get('/accounts/:accountId', adaptRoute(makeFindAccountController()));

export { accountsRouter };
