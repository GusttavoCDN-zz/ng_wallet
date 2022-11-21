import { Router } from 'express';
import { makeCreateTransactionController } from '../factories/create-transaction';
import { makeFindAccountController } from '../factories/find-account';
import { makeFindTransactionsController } from '../factories/find-transactions';
import { adaptRoute } from '../config/adapter';
import { authenticate } from '../middlewares/authenticate';

const accountsRouter = Router();

accountsRouter.post(
  '/transactions',
  authenticate,
  adaptRoute(makeCreateTransactionController())
);

accountsRouter.get(
  '/transactions/:accountId',
  authenticate,
  adaptRoute(makeFindTransactionsController())
);

accountsRouter.get(
  '/accounts/:accountId',
  authenticate,
  adaptRoute(makeFindAccountController())
);

export { accountsRouter };
