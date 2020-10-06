import IProductRepository from '@modules/product/repositories/IProductRepository';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import AppError from '@shared/err/AppError';
import { injectable, inject } from 'inversify';
import CartProduct from '../infra/typeorm/entities/CartProducts';
import ICartProductRepository from '../repositories/ICartProductRepository';
import ICartRepository from '../repositories/ICartRepository';

interface IRequest {
  user_id: string;
  products_ids: string[];
}
@injectable()
export default class CreateCartProductsService {
  constructor(
    @inject('CartProductRepository')
    private cartProductRepository: ICartProductRepository,
    @inject('ProductRepository')
    private productRepository: IProductRepository,
    @inject('CartRepository')
    private cartRepository: ICartRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    user_id,
    products_ids,
  }: IRequest): Promise<CartProduct[]> {
    if (!products_ids || products_ids.length === 0) {
      throw new AppError('Products ids is not provided');
    }
    if (!user_id) {
      throw new AppError('User id is not provided');
    }

    const isValidUser = await this.userRepository.findById(user_id);

    if (!isValidUser) {
      throw new AppError('Invalid user id');
    }

    let isValidCart = await this.cartRepository.findByUserId(user_id);

    if (!isValidCart) {
      isValidCart = await this.cartRepository.create({ user_id });
    }

    const isValidProducts = await this.productRepository.findByIds(
      products_ids,
    );

    if (isValidProducts.length < products_ids.length) {
      throw new AppError('One of these products no existing');
    }

    const cartProduct = await this.cartProductRepository.create({
      products_ids,
      cart_id: isValidCart.id,
    });

    return cartProduct;
  }
}
