import ICreateCartProductDTO from '@modules/cart/dtos/ICreateCartProductDTO';
import CartProduct from '@modules/cart/infra/typeorm/entities/CartProducts';
import ICartProductRepository from '../ICartProductRepository';

export default class FakeCartProductRepository
  implements ICartProductRepository {
  private cartProducts: CartProduct[] = [];

  public async create({
    cart_id,
    products_ids,
  }: ICreateCartProductDTO): Promise<CartProduct[]> {
    const cartProducts = products_ids.map(product_id => {
      const cartProduct = new CartProduct();
      Object.assign(cartProduct, { product_id, cart_id });
      return cartProduct;
    });

    this.cartProducts.push(...cartProducts);

    return cartProducts;
  }
}
