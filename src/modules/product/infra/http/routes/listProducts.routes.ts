import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const listProductsRouter = Router();
const productController = new ProductController();

listProductsRouter.get('/list', productController.index);
export default listProductsRouter;
