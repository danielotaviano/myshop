import CreateProductService from '@modules/product/services/CreateProductService';
import ListAllProductsService from '@modules/product/services/ListAllProductsService';
import container from '@shared/container/inversify.config';
import { Request, Response } from 'express';

export default class ProductController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity, description, photo_url } = req.body;

    const createProduct = container.resolve(CreateProductService);

    const user = await createProduct.execute({
      name,
      price,
      quantity,
      description,
      photo_url,
    });

    return res.json(user);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listAllProducts = container.resolve(ListAllProductsService);

    const products = await listAllProducts.execute();

    const teste = products.map(product => ({
      ...product,
      price: product.price + 20,
    }));
    return res.json(teste);
  }
}
