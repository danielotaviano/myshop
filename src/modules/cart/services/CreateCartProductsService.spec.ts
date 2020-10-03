import FakeProductRepository from '@modules/product/repositories/fakes/FakeProductRepository';
import IProductRepository from '@modules/product/repositories/IProductRepository';
import CreateProductService from '@modules/product/services/CreateProductService';
import FakeHashProvider from '@modules/user/providers/HashProvider/fake/FakeHashProvider';
import FakeUserRepository from '@modules/user/repositories/fakes/FakeUserRepository';
import CreateUserService from '@modules/user/services/CreateUserService';
import AppError from '@shared/err/AppError';

import FakeCartProductRepository from '../repositories/fakes/FakeCartProductRepository';
import FakeCartRepository from '../repositories/fakes/FakeCartRepository';

import CreateCartProductsService from './CreateCartProductsService';
import CreateCartService from './CreateCartService';

describe('Create a product that existing in cart', () => {
  let createProduct: CreateProductService;
  let fakeProductRepository: FakeProductRepository;
  let fakeCartRepository: FakeCartRepository;
  let fakeUserRepository: FakeUserRepository;
  let createCart: CreateCartService;
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
    createCart = new CreateCartService(fakeCartRepository, fakeUserRepository);
    fakeCartProductRepository = new FakeCartProductRepository();
    createCartProduct = new CreateCartProductsService(
      fakeCartProductRepository,
      fakeProductRepository,
      fakeCartRepository,
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

    const cart = await createCart.execute({ user_id: user.id });
    const cartProducts = await createCartProduct.execute({
      cart_id: cart.id,
      products_ids: [product1.id, product2.id],
    });

    cartProducts.forEach(cartProduct => {
      expect(cartProduct.cart_id).toBe(cart.id);
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

    const cart = await createCart.execute({ user_id: user.id });

    await expect(
      createCartProduct.execute({
        cart_id: cart.id,
        products_ids: [],
      }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      createCartProduct.execute({
        cart_id: cart.id,
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
        cart_id: undefined,
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

    const cart = await createCart.execute({ user_id: user.id });
    const product1 = await createProduct.execute({
      name: 'Product 1',
      description: 'product 01',
      price: 19.9,
      quantity: 5,
      photo_url: 'www.google.com',
    });

    await expect(
      createCartProduct.execute({
        cart_id: cart.id,
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
        cart_id: 'invalid cart_id',
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

    const cart = await createCart.execute({ user_id: user.id });
    const product1 = await createProduct.execute({
      name: 'Product 1',
      description: 'product 01',
      price: 19.9,
      quantity: 5,
      photo_url: 'www.google.com',
    });

    await expect(
      createCartProduct.execute({
        cart_id: cart.id,
        products_ids: [product1.id, 'invalid_id'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});