import ensureAuthenticate from '@modules/user/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import CartController from '../controllers/CartController';

const cartRouter = Router();

const cartController = new CartController();

cartRouter.use(ensureAuthenticate);

cartRouter.post('/create-cart', cartController.create);
cartRouter.get('/me', cartController.show);

export default cartRouter;
