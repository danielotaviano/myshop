import { Router } from 'express';
import createProductRouter from './createProduct.routes';
import listProductsRouter from './listProducts.routes';

const productRouter = Router();

productRouter.use(createProductRouter);
productRouter.use(listProductsRouter);

export default productRouter;
