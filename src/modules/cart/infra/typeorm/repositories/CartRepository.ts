import { getRepository, Repository } from 'typeorm';
import Cart from '../entities/Cart';
import ICartRepository from '../../../repositories/ICartRepository';
import ICreateCartDTO from '../../../dtos/ICreateCartDTO';
import { injectable } from 'inversify';

@injectable()
export default class CartRepository implements ICartRepository {
  private ormRepository: Repository<Cart>;
  constructor() {
    this.ormRepository = getRepository(Cart);
  }

  public async create({ user_id }: ICreateCartDTO): Promise<Cart> {
    const cart = this.ormRepository.create({ user_id });

    await this.ormRepository.save(cart);

    return cart;
  }

  public async findByUserId(user_id: string): Promise<Cart | undefined> {
    const cart = this.ormRepository.findOne({
      where: { user_id },
      relations: ['cartProducts'],
    });

    return cart;
  }

  public async findById(id: string): Promise<Cart | undefined> {
    const cart = this.ormRepository.findOne({
      where: { id },
      // relations: ['cartProducts'],
    });

    return cart;
  }
}
