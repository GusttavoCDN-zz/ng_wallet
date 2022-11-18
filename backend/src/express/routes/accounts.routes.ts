import { Router } from 'express';
import { makeCreateTransactionController } from '../../factories/create-transaction';
import { adaptRoute } from '../config/adapter';

const accountsRouter = Router();

accountsRouter.post('/transactions', adaptRoute(makeCreateTransactionController()));

export { accountsRouter };
