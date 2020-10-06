import CreateCartService from '@modules/cart/services/CreateCartService';
import ListCartOfUserService from '@modules/cart/services/ListCartOfUserService';
import container from '@shared/container/inversify.config';
import { Request, Response } from 'express';

export default class CartController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const createCart = container.resolve(CreateCartService);

    const user = await createCart.execute({ user_id });

    return res.json(user);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listCartProduct = container.resolve(ListCartOfUserService);

    const listCartProducts = await listCartProduct.execute({
      user_id: user_id.toString(),
    });

    return res.json(listCartProducts);
  }
}
