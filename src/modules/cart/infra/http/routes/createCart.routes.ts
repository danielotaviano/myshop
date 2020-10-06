import ensureAuthenticate from '@modules/user/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import CartController from '../controllers/CartController';
import CartProductsController from '../controllers/CartProductsController';

const createCartRouter = Router();

const cartController = new CartController();
const cartProductsController = new CartProductsController();

createCartRouter.use(ensureAuthenticate);

createCartRouter.post('/create-cart', cartController.create);
createCartRouter.post('/create-cart-products', cartProductsController.create);
createCartRouter.get('/me', cartProductsController.index);

export default createCartRouter;
