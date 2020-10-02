import AppError from '@shared/err/AppError';
import FakeProductRepository from '../repositories/fakes/FakeProductRepository';
import CreateProductService from './CreateProductService';

describe('CreateProductService', () => {
  it('should be able to create a product', async () => {
    const fakeProductRepository = new FakeProductRepository();
    const createProduct = new CreateProductService(fakeProductRepository);

    const product = await createProduct.execute({
      name: 'Bike',
      description: 'A bicycle',
      price: 19.9,
      quantity: 10,
      photo_url: 'www.google.com',
    });

    expect(product.name).toBe('Bike');
    expect(product.description).toBe('A bicycle');
    expect(product.name).toBe('Bike');
    expect(product.price).toBe(19.9);
    expect(product.quantity).toBe(10);
    expect(product.photo_url).toBe('www.google.com');
  });

  it('should not be able to create a product without a name', async () => {
    const fakeProductRepository = new FakeProductRepository();
    const createProduct = new CreateProductService(fakeProductRepository);

    await expect(
      createProduct.execute({
        name: '',
        description: 'A bicycle',
        price: 19.9,
        quantity: 10,
        photo_url: 'www.google.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a product with a existing name', async () => {
    const fakeProductRepository = new FakeProductRepository();
    const createProduct = new CreateProductService(fakeProductRepository);

    await createProduct.execute({
      name: 'bike',
      description: 'A bicycle',
      price: 19.9,
      quantity: 10,
      photo_url: 'www.google.com',
    });

    await expect(
      createProduct.execute({
        name: 'bike',
        description: 'A bicycle',
        price: 19.9,
        quantity: 10,
        photo_url: 'www.google.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a product without a price', async () => {
    const fakeProductRepository = new FakeProductRepository();
    const createProduct = new CreateProductService(fakeProductRepository);

    await expect(
      createProduct.execute({
        name: 'Bike',
        description: 'A bicycle',
        price: undefined,
        quantity: 10,
        photo_url: 'www.google.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a product with a quantity less than 0', async () => {
    const fakeProductRepository = new FakeProductRepository();
    const createProduct = new CreateProductService(fakeProductRepository);

    await expect(
      createProduct.execute({
        name: 'Bike',
        description: 'A bicycle',
        price: 19.9,
        quantity: -1,
        photo_url: 'www.google.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a product without a description', async () => {
    const fakeProductRepository = new FakeProductRepository();
    const createProduct = new CreateProductService(fakeProductRepository);

    await expect(
      createProduct.execute({
        name: 'Bike',
        description: undefined,
        price: 19.9,
        quantity: 5,
        photo_url: 'www.google.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should quantity equal a zero if quantity has not provided', async () => {
    const fakeProductRepository = new FakeProductRepository();
    const createProduct = new CreateProductService(fakeProductRepository);

    const product = await createProduct.execute({
      name: 'Bike',
      description: 'a bike',
      price: 19.9,
      quantity: undefined,
      photo_url: 'www.google.com',
    });

    expect(product.quantity).toBe(0);
  });
});
