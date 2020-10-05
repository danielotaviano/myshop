import FakeProductRepository from '@modules/product/repositories/fakes/FakeProductRepository';
import CreateProductService from '@modules/product/services/CreateProductService';
import FakeHashProvider from '@modules/user/providers/HashProvider/fake/FakeHashProvider';
import FakeUserRepository from '@modules/user/repositories/fakes/FakeUserRepository';
import CreateUserService from '@modules/user/services/CreateUserService';
import AppError from '@shared/err/AppError';
import FakeCartProductRepository from '../repositories/fakes/FakeCartProductRepository';
import FakeCartRepository from '../repositories/fakes/FakeCartRepository';
import CreateCartProductsService from './CreateCartProductsService';
import CreateCartService from './CreateCartService';
import ListCartOfUserService from './ListCartOfUserService';

describe('List a cart of an user', () => {
  let createProduct: CreateProductService;
  let fakeProductRepository: FakeProductRepository;
  let fakeCartRepository: FakeCartRepository;
  let fakeUserRepository: FakeUserRepository;
  let createCart: CreateCartService;
  let listCart: ListCartOfUserService;
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
    listCart = new ListCartOfUserService(
      fakeCartRepository,
      fakeUserRepository,
    );
    createCart = new CreateCartService(fakeCartRepository, fakeUserRepository);
    fakeCartProductRepository = new FakeCartProductRepository();
    createCartProduct = new CreateCartProductsService(
      fakeCartProductRepository,
      fakeProductRepository,
      fakeCartRepository,
    );
  });
  it('should be able to list the cart of an user', async () => {
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
    await createCartProduct.execute({
      cart_id: cart.id,
      products_ids: [product1.id, product2.id],
    });

    const listOfCart = await listCart.execute({ user_id: user.id });

    expect(listOfCart.user_id).toBe(user.id);
  });

  it('should not be able to list the cart of an inexisting user', async () => {
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
      listCart.execute({ user_id: 'invalid_id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
