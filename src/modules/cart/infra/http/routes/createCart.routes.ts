import { Router } from 'express';
import CartController from '../controllers/CartController';

const createCartRouter = Router();

const cartController = new CartController();

createCartRouter.post('/create-cart', cartController.create);

export default createCartRouter;
