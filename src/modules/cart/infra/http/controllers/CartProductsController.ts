import CreateCartProductsService from '@modules/cart/services/CreateCartProductsService';
import ListCartOfUserService from '@modules/cart/services/ListCartOfUserService';
import container from '@shared/container/inversify.config';
import { Request, Response } from 'express';

export default class CartProductsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { cart_id, products_ids } = req.body;

    const createCart = container.resolve(CreateCartProductsService);

    const user = await createCart.execute({ cart_id, products_ids });

    return res.json(user);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.query.user_id;

    const listCartProduct = container.resolve(ListCartOfUserService);

    const listCartProducts = await listCartProduct.execute({
      user_id: user_id.toString(),
    });

    return res.json(listCartProducts);
  }
}
