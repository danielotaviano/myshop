import IProductRepository from '@modules/product/repositories/IProductRepository';
import AppError from '@shared/err/AppError';
import { injectable, inject } from 'inversify';
import ICreateCartProductDTO from '../dtos/ICreateCartProductDTO';
import CartProduct from '../infra/typeorm/entities/CartProducts';
import ICartProductRepository from '../repositories/ICartProductRepository';
import ICartRepository from '../repositories/ICartRepository';

@injectable()
export default class CreateCartProductsService {
  constructor(
    @inject('CartProductRepository')
    private cartProductRepository: ICartProductRepository,
    @inject('ProductRepository')
    private productRepository: IProductRepository,
    @inject('CartRepository')
    private cartRepository: ICartRepository,
  ) {}

  public async execute({
    cart_id,
    products_ids,
  }: ICreateCartProductDTO): Promise<CartProduct[]> {
    if (!products_ids || products_ids.length === 0) {
      throw new AppError('Products ids is not provided');
    }
    if (!cart_id) {
      throw new AppError('Cart id is not provided');
    }
    const isValidCart = await this.cartRepository.findById(cart_id);

    if (!isValidCart) {
      throw new AppError('Invalid cart id');
    }
    const isValidProducts = await this.productRepository.findByIds(
      products_ids,
    );
    if (isValidProducts.length < products_ids.length) {
      throw new AppError('One of these products no existing');
    }

    const cartProduct = await this.cartProductRepository.create({
      products_ids,
      cart_id,
    });

    return cartProduct;
  }
}
