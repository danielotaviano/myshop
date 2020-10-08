import cartIndexRouter from '@modules/cart/infra/http/routes';
import orderIndexRouter from '@modules/order/infra/http/routes';
import productRouter from '@modules/product/infra/http/routes';
import userIndexRouter from '@modules/user/infra/http/routes';

import { Router } from 'express';

const indexRouter = Router();

indexRouter.use('/user', userIndexRouter);
indexRouter.use('/order', orderIndexRouter);
indexRouter.use('/product', productRouter);
indexRouter.use('/cart', cartIndexRouter);

export default indexRouter;
