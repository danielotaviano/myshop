import ICreateCartProductDTO from '@modules/cart/dtos/ICreateCartProductDTO';
import CartProduct from '@modules/cart/infra/typeorm/entities/CartProducts';
import ICartProductRepository from '../ICartProductRepository';

export default class FakeCartProductRepository
  implements ICartProductRepository {
  private cartProducts: CartProduct[] = [];

  public async create({
    cart_id,
    products,
  }: ICreateCartProductDTO): Promise<CartProduct[]> {
    const cartProducts = products.map(product => {
      const cartProduct = new CartProduct();
      Object.assign(cartProduct, {
        product_id: product.id,
        cart_id,
        price: product.price,
      });
      return cartProduct;
    });

    this.cartProducts.push(...cartProducts);

    return cartProducts;
  }
}
