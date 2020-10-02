import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import AppError from '../../err/AppError';
import indexRouter from './routes';

const app = express();

app.use(express.json());
app.use(indexRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.status_code ? err.status_code : 400).json({
      error: err.message,
    });
  }
  console.log(err);
  return res.status(500).json({
    error: 'Internal Server Error',
  });
});

export default app;
