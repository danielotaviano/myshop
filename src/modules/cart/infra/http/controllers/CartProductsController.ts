import CreateCartProductsService from '@modules/cart/services/CreateCartProductsService';
import container from '@shared/container/inversify.config';
import { Request, Response } from 'express';

export default class CartProductsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { cart_id, products_ids } = req.body;

    const createCart = container.resolve(CreateCartProductsService);

    const user = await createCart.execute({ cart_id, products_ids });

    return res.json(user);
  }
}
