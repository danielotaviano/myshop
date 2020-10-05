import IUserRepository from '@modules/user/repositories/IUserRepository';
import AppError from '@shared/err/AppError';
import { injectable, inject } from 'inversify';
import Cart from '../infra/typeorm/entities/Cart';
import ICartRepository from '../repositories/ICartRepository';

@injectable()
export default class ListCartOfUserService {
  constructor(
    @inject('CartRepository')
    private cartRepository: ICartRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ user_id }: { user_id: string }): Promise<Cart> {
    const isExistingUser = await this.userRepository.findById(user_id);
    if (!isExistingUser) {
      throw new AppError('This user is not a existing user');
    }
    const carts = this.cartRepository.findByUserId(user_id);

    return carts;
  }
}
