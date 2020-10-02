import { inject, injectable } from 'inversify';
import Product from '../infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductRepository';

@injectable()
export default class ListAllProductsService {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductRepository,
  ) {}

  execute(): Promise<Product[]> {
    const products = this.productsRepository.listAll();

    return products;
  }
}
