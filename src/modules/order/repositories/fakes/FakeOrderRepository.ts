import ICreateOrderDTO from '@modules/order/dtos/ICreateOrderDTO';
import Order from '@modules/order/infra/typeorm/entities/Order';

import IOrderRepository from '../IOrderRepository';

export default class FakeOrderRepository implements IOrderRepository {
  private orders: Order[] = [];

  public async create(orderInfo: ICreateOrderDTO): Promise<Order> {
    const order = new Order();
    Object.assign(order, orderInfo);
    this.orders.push(order);

    return order;
  }

  public async save(order: Order): Promise<Order> {
    this.orders.push(order);

    return order;
  }
}
