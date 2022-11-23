import request from 'supertest';
import app from '../config/app';
import { authenticate } from './authenticate';
import jwt from 'jsonwebtoken';
import { Payload } from '../../application/contracts';

const SECRET = process.env.SECRET ?? 'secret';

const payload: Payload = {
  id: 1,
  username: 'any_username',
  account: 'any_account'
};

describe('Authenticate Middleware test', () => {
  app.get('/test-auth', authenticate, (req, res) => {
    res.send(req.user);
  });

  it('Should response with 401 if token is invalid token', async () => {
    const token = 'invalid_token';

    await request(app).get('/test-auth').set('Authorization', token).expect(401);
  });

  it('Should response with 401 if token is not provided', async () => {
    await request(app).get('/test-auth').expect(401);
  });

  it('Should response with 200 if token is valid', async () => {
    const token = jwt.sign({ data: payload }, SECRET);
    await request(app).get('/test-auth').set('Authorization', token).expect(200);
  });
});
