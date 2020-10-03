import { v4 } from 'uuid';
import ICreateCartDTO from '../../dtos/ICreateCartDTO';
import Cart from '../../infra/typeorm/entities/Cart';
import ICartRepository from '../ICartRepository';

export default class FakeCartRepository implements ICartRepository {
  private carts: Cart[] = [];
  public async create({ user_id }: ICreateCartDTO): Promise<Cart> {
    const cart = new Cart();
    Object.assign(cart, { user_id, id: v4() });
    this.carts.push(cart);

    return cart;
  }

  public async findByUserId(user_id: string): Promise<Cart | undefined> {
    const cart = this.carts.find(cart => cart.user_id === user_id);

    return cart;
  }

  public async findById(id: string): Promise<Cart | undefined> {
    const cart = this.carts.find(cart => cart.id === id);

    return cart;
  }
}
