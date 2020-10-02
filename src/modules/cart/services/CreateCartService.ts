import IUserRepository from '@modules/user/repositories/IUserRepository';
import AppError from '@shared/err/AppError';
import { injectable, inject } from 'inversify';
import Cart from '../infra/typeorm/entities/Cart';
import ICartRepository from '../repositories/ICartRepository';

interface IRequest {
  user_id: string;
}
@injectable()
export default class CreateCartService {
  constructor(
    @inject('CartRepository')
    private cartRepository: ICartRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Cart> {
    if (!user_id) {
      throw new AppError('User id of cart is not provided');
    }

    const isExistingUserWithThisId = await this.userRepository.findById(
      user_id,
    );
    if (!isExistingUserWithThisId) {
      throw new AppError('This user doesnt exist');
    }

    const cart = await this.cartRepository.create({
      user_id,
    });

    return cart;
  }
}
