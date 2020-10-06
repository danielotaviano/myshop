import { Router } from 'express';
import cartRouter from './Cart.routes';

import cartProductRouter from './CartProduct.routes';

const cartIndexRouter = Router();

cartIndexRouter.use(cartRouter);
cartIndexRouter.use('/product', cartProductRouter);

export default cartIndexRouter;
