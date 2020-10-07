import Product from '@modules/product/infra/typeorm/entities/Product';

export default interface ICreateCartProductDTO {
  products: Product[];
  cart_id: string;
}
