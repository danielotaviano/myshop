import { Router } from 'express';
import orderRouter from './order.routes';

const orderIndexRouter = Router();

orderIndexRouter.use(orderRouter);

export default orderIndexRouter;
