import { Router } from 'express';
import sessionRouter from './session.routes';
import userRouter from './user.routes';

const userIndexRouter = Router();

userIndexRouter.use('/user', userRouter);
userIndexRouter.use('/session', sessionRouter);

export default userIndexRouter;
