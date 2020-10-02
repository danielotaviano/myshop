import createCartRouter from '@modules/cart/infra/http/routes/createCart.routes';
import productRouter from '@modules/product/infra/http/routes';
import createUserRouter from '@modules/user/infra/http/routes/createUser.routes';
import { Router } from 'express';

const indexRouter = Router();

indexRouter.use('/user', createUserRouter);
indexRouter.use('/product', productRouter);
indexRouter.use('/cart', createCartRouter);

export default indexRouter;
