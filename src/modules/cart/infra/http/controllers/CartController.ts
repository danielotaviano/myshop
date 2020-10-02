import CreateCartService from '@modules/cart/services/CreateCartService';
import container from '@shared/container/inversify.config';
import { Request, Response } from 'express';

export default class CartController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.body;

    const createCart = container.resolve(CreateCartService);

    const user = await createCart.execute({ user_id });

    return res.json(user);
  }
}
