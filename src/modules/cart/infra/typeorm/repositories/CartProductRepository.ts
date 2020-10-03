import ICreateCartProductDTO from '@modules/cart/dtos/ICreateCartProductDTO';
import CartProduct from '@modules/cart/infra/typeorm/entities/CartProducts';
import ICartProductRepository from '@modules/cart/repositories/ICartProductRepository';
import { injectable } from 'inversify';
import { getRepository, Repository } from 'typeorm';

@injectable()
export default class CartProductRepository implements ICartProductRepository {
  private ormRepository: Repository<CartProduct>;
  constructor() {
    this.ormRepository = getRepository(CartProduct);
  }

  public async create({
    cart_id,
    products_ids,
  }: ICreateCartProductDTO): Promise<CartProduct[]> {
    const cartProducts = products_ids.map(product_id => {
      return this.ormRepository.create({ product_id, cart_id });
    });

    await this.ormRepository.save(cartProducts);

    return this.ormRepository.save(cartProducts);
  }
}
