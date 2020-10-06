import ListCartOfUserService from '@modules/cart/services/ListCartOfUserService';
import container from '@shared/container/inversify.config';
import { Request, Response } from 'express';

export default class CartController {
  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listCartProduct = container.resolve(ListCartOfUserService);

    const listCartProducts = await listCartProduct.execute({
      user_id: user_id.toString(),
    });

    return res.json(listCartProducts);
  }
}
