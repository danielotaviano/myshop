import ICreateCartProductDTO from '../dtos/ICreateCartProductDTO';
import CartProduct from '../infra/typeorm/entities/CartProducts';

export default interface ICartProductRepository {
  create(data: ICreateCartProductDTO): Promise<CartProduct[]>;
}
