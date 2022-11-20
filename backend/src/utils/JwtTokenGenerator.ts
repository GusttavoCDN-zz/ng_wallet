import { TokenGenerator } from './TokenGenerator';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

type Payload = {
  id: number
  username: string
};

export class JwtTokenGenerator implements TokenGenerator {
  private readonly config: jwt.SignOptions;
  private readonly jwtSecret = process.env.SECRET ?? 'secret';
  private readonly jwt: typeof jwt;

  constructor() {
    this.config = {
      expiresIn: '24h',
      algorithm: 'HS256'
    };

    this.jwt = jwt;
  }

  generate = async (payload: Payload): Promise<string> => {
    return this.jwt.sign({ data: payload }, this.jwtSecret, this.config);
  };
}
