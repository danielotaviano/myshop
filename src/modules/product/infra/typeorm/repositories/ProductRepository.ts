import { getRepository, Repository } from 'typeorm';
import ICreateProductDTO from '../../../dtos/ICreateProductDTO';
import Product from '../entities/Product';
import IProductRepository from '../../../repositories/IProductRepository';
import { injectable } from 'inversify';

@injectable()
export default class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;
  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    description,
    name,
    photo_url,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      description,
      name,
      photo_url,
      price,
      quantity,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async listAll(): Promise<Product[]> {
    const products = this.ormRepository.find();

    return products;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const products = this.ormRepository.findOne({
      where: { name },
    });

    return products;
  }

  public async findByIds(ids: string[]): Promise<Product[]> {
    const products = await this.ormRepository.findByIds(ids);

    return products;
  }
}
