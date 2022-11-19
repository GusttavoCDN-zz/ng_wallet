import { Router } from 'express';
import { makeSignUpController } from '../../factories/sign-up';
import { makeSignInController } from '../../factories/sign-in';
import { adaptRoute } from '../config/adapter';

const usersRouter = Router();

usersRouter.post('/users', adaptRoute(makeSignUpController()));
usersRouter.post('/signin', adaptRoute(makeSignInController()));

export { usersRouter };
