import { Router } from 'express';
import { makeSignUpController } from '../../factories/sign-up';
import { adaptRoute } from '../config/adapter';

const usersRouter = Router();

const controller = makeSignUpController();

usersRouter.post('/users', adaptRoute(controller));

export { usersRouter };
