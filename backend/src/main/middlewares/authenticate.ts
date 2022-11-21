import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import 'dotenv/config';

const SECRET = process.env.SECRET ?? 'secret';

type Payload = {
  id: number
  username: string
  account: string
};

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const { data } = verify(token, SECRET) as { data: Payload };
    req.user = data;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' });
  }
};

export { authenticate };
