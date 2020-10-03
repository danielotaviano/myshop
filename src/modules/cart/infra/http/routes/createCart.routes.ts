import { Router } from 'express';
import CartController from '../controllers/CartController';
import CartProductsController from '../controllers/CartProductsController';

const createCartRouter = Router();

const cartController = new CartController();
const cartProductsController = new CartProductsController();

createCartRouter.post('/create-cart', cartController.create);
createCartRouter.post('/create-cart-products', cartProductsController.create);

export default createCartRouter;
