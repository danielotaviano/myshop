import AppError from '@shared/err/AppError';
import { inject, injectable } from 'inversify';
import Product from '../infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductRepository';

interface IRequest {
  name: string;
  description: string;
  price: number;
  quantity: number;
  photo_url: string;
}
@injectable()
export default class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({
    name,
    description,
    photo_url,
    price,
    quantity = 0,
  }: IRequest): Promise<Product> {
    if (!name) {
      throw new AppError('Name has not provided');
    }
    if (!price) {
      throw new AppError('Price has not provided');
    }

    if (!description) {
      throw new AppError('Descritpion has not provided');
    }

    if (quantity < 0) {
      throw new AppError('Quantity cannot be less than 0');
    }
    const existingProductWithTheSameName = await this.productRepository.findByName(
      name,
    );

    if (existingProductWithTheSameName) {
      throw new AppError('This product is already existing');
    }

    const product = await this.productRepository.create({
      name,
      photo_url,
      price,
      description,
      quantity,
    });

    return product;
  }
}
