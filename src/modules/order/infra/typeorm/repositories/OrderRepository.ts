import ICreateOrderDTO from '@modules/order/dtos/ICreateOrderDTO';
import Order from '@modules/order/infra/typeorm/entities/Order';
import IOrderRepository from '@modules/order/repositories/IOrderRepository';
import { injectable } from 'inversify';
import { getRepository, Repository } from 'typeorm';

@injectable()
export default class OrderRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async create(orderInfo: ICreateOrderDTO): Promise<Order> {
    const order = this.ormRepository.create(orderInfo);

    return this.ormRepository.save(order);
  }

  public async save(order: Order): Promise<Order> {
    return this.ormRepository.save(order);
  }
}
