import ICreateProductDTO from '../dtos/ICreateProductDTO';
import Product from '../infra/typeorm/entities/Product';

export default interface IProductRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  listAll(): Promise<Product[]>;
  findByName(name: string): Promise<Product | undefined>;
  findByIds(ids: string[]): Promise<Product[]>;
}
