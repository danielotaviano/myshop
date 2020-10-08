import FakeProductRepository from '@modules/product/repositories/fakes/FakeProductRepository';
import CreateProductService from '@modules/product/services/CreateProductService';
import FakeHashProvider from '@modules/user/providers/HashProvider/fake/FakeHashProvider';
import FakeUserRepository from '@modules/user/repositories/fakes/FakeUserRepository';
import CreateUserService from '@modules/user/services/CreateUserService';
import AppError from '@shared/err/AppError';

import FakeCartProductRepository from '../repositories/fakes/FakeCartProductRepository';
import FakeCartRepository from '../repositories/fakes/FakeCartRepository';

import CreateCartProductsService from './CreateCartProductsService';

describe('Create a product that existing in cart', () => {
  let createProduct: CreateProductService;
  let fakeProductRepository: FakeProductRepository;
  let fakeCartRepository: FakeCartRepository;
  let fakeUserRepository: FakeUserRepository;
  let createCartProduct: CreateCartProductsService;
  let createUser: CreateUserService;
  let fakeHashProvider: FakeHashProvider;
  let fakeCartProductRepository: FakeCartProductRepository;

  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
    createProduct = new CreateProductService(fakeProductRepository);
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
    fakeCartRepository = new FakeCartRepository();

    fakeCartProductRepository = new FakeCartProductRepository();
    createCartProduct = new CreateCartProductsService(
      fakeCartProductRepository,
      fakeProductRepository,
      fakeCartRepository,
      fakeUserRepository,
    );
  });
  it('should be able to create a cart products', async () => {
    const product1 = await createProduct.execute({
      name: 'Product 1',
      description: 'product 01',
      price: 19.9,
      quantity: 5,
      photo_url: 'www.google.com',
    });
    const product2 = await createProduct.execute({
      name: 'Product 2',
      description: 'product 02',
      price: 50,
      quantity: 10,
      photo_url: 'www.google.com',
    });

    const user = await createUser.execute({
      email: 'email@exemple.com',
      name: 'Name Exemple',
      password: 'passwordexemple',
      password_confirmation: 'passwordexemple',
    });

    const cartProducts = await createCartProduct.execute({
      user_id: user.id,
      products_ids: [product1.id, product2.id],
    });

    cartProducts.forEach(cartProduct => {
      expect(cartProduct.cart_id).toBeTruthy();
      expect(cartProduct).toHaveProperty('product_id');
    });
  });

  it('should be able to create a cart products if cart doesnt existing yet', async () => {
    const product1 = await createProduct.execute({
      name: 'Product 1',
      description: 'product 01',
      price: 19.9,
      quantity: 5,
      photo_url: 'www.google.com',
    });
    const product2 = await createProduct.execute({
      name: 'Product 2',
      description: 'product 02',
      price: 50,
      quantity: 10,
      photo_url: 'www.google.com',
    });

    const user = await createUser.execute({
      email: 'email@exemple.com',
      name: 'Name Exemple',
      password: 'passwordexemple',
      password_confirmation: 'passwordexemple',
    });

    const cartProducts = await createCartProduct.execute({
      user_id: user.id,
      products_ids: [product1.id, product2.id],
    });

    cartProducts.forEach(cartProduct => {
      expect(cartProduct).toHaveProperty('cart_id');
      expect(cartProduct).toHaveProperty('product_id');
    });
  });
  it('should not be able to create a cart products without products', async () => {
    const user = await createUser.execute({
      email: 'email@exemple.com',
      name: 'Name Exemple',
      password: 'passwordexemple',
      password_confirmation: 'passwordexemple',
    });

    await expect(
      createCartProduct.execute({
        user_id: user.id,
        products_ids: [],
      }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      createCartProduct.execute({
        user_id: user.id,
        products_ids: undefined,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a cart products without a cart', async () => {
    const product1 = await createProduct.execute({
      name: 'Product 1',
      description: 'product 01',
      price: 19.9,
      quantity: 5,
      photo_url: 'www.google.com',
    });
    const product2 = await createProduct.execute({
      name: 'Product 2',
      description: 'product 02',
      price: 50,
      quantity: 10,
      photo_url: 'www.google.com',
    });

    await expect(
      createCartProduct.execute({
        user_id: undefined,
        products_ids: [product1.id, product2.id],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a cart products without a valid products_id', async () => {
    const user = await createUser.execute({
      email: 'email@exemple.com',
      name: 'Name Exemple',
      password: 'passwordexemple',
      password_confirmation: 'passwordexemple',
    });

    const product1 = await createProduct.execute({
      name: 'Product 1',
      description: 'product 01',
      price: 19.9,
      quantity: 5,
      photo_url: 'www.google.com',
    });

    await expect(
      createCartProduct.execute({
        user_id: user.id,
        products_ids: [product1.id, 'invalid_id'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a cart products without a cart id', async () => {
    const product1 = await createProduct.execute({
      name: 'Product 1',
      description: 'product 01',
      price: 19.9,
      quantity: 5,
      photo_url: 'www.google.com',
    });

    await expect(
      createCartProduct.execute({
        user_id: 'invalid user_id',
        products_ids: [product1.id],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a cart products without a valid products_id', async () => {
    const user = await createUser.execute({
      email: 'email@exemple.com',
      name: 'Name Exemple',
      password: 'passwordexemple',
      password_confirmation: 'passwordexemple',
    });

    const product1 = await createProduct.execute({
      name: 'Product 1',
      description: 'product 01',
      price: 19.9,
      quantity: 5,
      photo_url: 'www.google.com',
    });

    await expect(
      createCartProduct.execute({
        user_id: user.id,
        products_ids: [product1.id, 'invalid_id'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
