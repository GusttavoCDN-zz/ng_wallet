import { Router } from 'express';
import { makeCreateTransactionController } from '../../factories/create-transaction';
import { makeFindAccountController } from '../../factories/find-account';
import { adaptRoute } from '../config/adapter';

const accountsRouter = Router();

accountsRouter.post('/transactions', adaptRoute(makeCreateTransactionController()));
accountsRouter.get('/accounts/:accountId', adaptRoute(makeFindAccountController()));

export { accountsRouter };
