import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import authConfig from '@config/auth';
import AppError from '@shared/err/AppError';

interface IToken {
  user_id: string;
  iat: number;
  exp: number;
}

export default function ensureAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('This route required an authenticate');
  }

  const [, token] = authHeader.split(' ');
  if (!token) {
    throw new AppError('This route required a token');
  }

  try {
    const decoded = verify(token, authConfig.jwt_secret);
    const { user_id: id } = decoded as IToken;

    req.user = { id };

    return next();
  } catch (error) {
    throw new AppError('This token is not valid');
  }
}
