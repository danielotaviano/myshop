import ICartRepository from '@modules/cart/repositories/ICartRepository';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import AppError from '@shared/err/AppError';
import { injectable, inject } from 'inversify';
import Order from '../infra/typeorm/entities/Order';
import ICreateTransactionDTO from '../providers/dtos/ICreateTransactionsDTO';

import IPaymentProvider from '../providers/payment/models/IPaymentProvider';
import IOrderRepository from '../repositories/IOrderRepository';

interface IRequest {
  user_id: string;
  paymentInfo: ICreateTransactionDTO;
}

@injectable()
export default class CreateOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
    @inject('CartRepository')
    private cartRepository: ICartRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('PaymentProvider')
    private paymentProvider: IPaymentProvider,
  ) {}

  public async execute({ user_id, paymentInfo }: IRequest): Promise<Order> {
    if (!paymentInfo) {
      throw new AppError('paymentInfo is required');
    }
    const isExistingUser = await this.userRepository.findById(user_id);

    if (!isExistingUser) {
      throw new AppError('This user does not exist');
    }

    if (user_id !== paymentInfo.customer.external_id) {
      throw new AppError(
        'User id and externalId of paymentInfo must be the same',
      );
    }
    const cart = await this.cartRepository.findByUserId(user_id);

    const order = await this.orderRepository.create({
      cart_id: cart.id,
      user_id,
      status: 'pending',
      total_price: cart.getTotalPrice(),
    });

    order.status = await this.paymentProvider.execute(paymentInfo);

    return this.orderRepository.save(order);
  }
}
