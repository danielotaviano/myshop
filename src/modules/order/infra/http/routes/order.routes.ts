import ensureAuthenticate from '@modules/user/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import OrderController from '../controllers/OrderController';

const orderRouter = Router();

const orderController = new OrderController();

orderRouter.use(ensureAuthenticate);

orderRouter.post('/create', orderController.create);

export default orderRouter;
