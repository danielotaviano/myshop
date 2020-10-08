import CreateOrderService from '@modules/order/services/CreateOrderService';
import container from '@shared/container/inversify.config';
import { Request, Response } from 'express';

export default class OrderController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const { paymentInfo } = req.body;

    const createOrder = container.resolve(CreateOrderService);
    const order = await createOrder.execute({ user_id, paymentInfo });

    return res.json(order);
  }
}
