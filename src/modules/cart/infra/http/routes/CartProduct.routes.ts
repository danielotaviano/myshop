import ensureAuthenticate from '@modules/user/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import CartProductsController from '../controllers/CartProductsController';

const cartProductRouter = Router();

const cartProductsController = new CartProductsController();

cartProductRouter.use(ensureAuthenticate);

cartProductRouter.post('/new', cartProductsController.create);

export default cartProductRouter;
