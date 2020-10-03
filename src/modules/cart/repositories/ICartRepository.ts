import ICreateCartDTO from '../dtos/ICreateCartDTO';
import Cart from '../infra/typeorm/entities/Cart';

export default interface ICartRepository {
  create(data: ICreateCartDTO): Promise<Cart>;
  findByUserId(user_id: string): Promise<Cart | undefined>;
  findById(id: string): Promise<Cart | undefined>;
}
