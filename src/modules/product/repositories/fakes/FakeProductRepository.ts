import ICreateProductDTO from '../../dtos/ICreateProductDTO';
import Product from '../../infra/typeorm/entities/Product';
import IProductRepository from '../IProductRepository';

export default class FakeProductRepository implements IProductRepository {
  products: Product[] = [];
  public async create({
    quantity,
    description,
    price,
    photo_url,
    name,
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product();
    Object.assign(product, { quantity, description, price, photo_url, name });
    this.products.push(product);
    return product;
  }

  public async listAll(): Promise<Product[]> {
    const products = this.products;

    return products;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.products.find(product => product.name === name);

    return product;
  }
}
