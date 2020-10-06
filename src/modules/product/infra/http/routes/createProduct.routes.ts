import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const createProductRouter = Router();

const productController = new ProductController();

createProductRouter.post('/create', productController.create);

export default createProductRouter;
