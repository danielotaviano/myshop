import FakeCartProductRepository from '@modules/cart/repositories/fakes/FakeCartProductRepository';
import FakeCartRepository from '@modules/cart/repositories/fakes/FakeCartRepository';
import CreateCartProductsService from '@modules/cart/services/CreateCartProductsService';
import FakeProductRepository from '@modules/product/repositories/fakes/FakeProductRepository';
import CreateProductService from '@modules/product/services/CreateProductService';
import FakeHashProvider from '@modules/user/providers/HashProvider/fake/FakeHashProvider';
import FakeUserRepository from '@modules/user/repositories/fakes/FakeUserRepository';
import CreateUserService from '@modules/user/services/CreateUserService';
import AppError from '@shared/err/AppError';
import ICreateTransactionDTO from '../providers/dtos/ICreateTransactionsDTO';
import FakePaymentProvider from '../providers/payment/fakes/FakePaymentProvider';
import FakeOrderRepository from '../repositories/fakes/FakeOrderRepository';
import CreateOrderService from './CreateOrderService';

// Entitie

describe('Create a order service', () => {
  let createProduct: CreateProductService;
  let fakeProductRepository: FakeProductRepository;
  let fakeCartRepository: FakeCartRepository;
  let fakeUserRepository: FakeUserRepository;
  let createCartProduct: CreateCartProductsService;
  let fakeOrderRepository: FakeOrderRepository;
  let createUser: CreateUserService;
  let createOrder: CreateOrderService;
  let fakePaymentProvider: FakePaymentProvider;
  let fakeHashProvider: FakeHashProvider;
  let fakeCartProductRepository: FakeCartProductRepository;

  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
    createProduct = new CreateProductService(fakeProductRepository);
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakePaymentProvider = new FakePaymentProvider();
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
    fakeCartRepository = new FakeCartRepository();
    fakeOrderRepository = new FakeOrderRepository();
    createOrder = new CreateOrderService(
      fakeOrderRepository,
      fakeCartRepository,
      fakeUserRepository,
      fakePaymentProvider,
    );

    fakeCartProductRepository = new FakeCartProductRepository();
    createCartProduct = new CreateCartProductsService(
      fakeCartProductRepository,
      fakeProductRepository,
      fakeCartRepository,
      fakeUserRepository,
    );
  });
  it('should be able to create a order', async () => {
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

    const paymentInfo: ICreateTransactionDTO = {
      amount: 10000,
      card_number: '4111111111111111',
      card_holder_name: 'abc',
      card_expiration_date: '1225',
      card_cvv: '123',
      customer: {
        external_id: user.id,
        name: 'João das Neves',
        type: 'individual',
        country: 'br',
        email: 'joaoneves@norte.com',
        documents: [
          {
            type: 'cpf',
            number: '30621143049',
          },
        ],
        phone_numbers: ['+5511999999999', '+5511888888888'],
        birthday: '1985-01-01',
      },
      billing: {
        name: 'João das Neves',
        address: {
          country: 'br',
          state: 'SP',
          city: 'São Paulo',
          neighborhood: 'Vila Carrao',
          street: 'Rua Lobo',
          street_number: '999',
          zipcode: '03424030',
        },
      },
      shipping: {
        name: 'João das Neves',
        fee: 1000,
        delivery_date: '2017-12-25',
        expedited: true,
        address: {
          country: 'br',
          state: 'SP',
          city: 'São Paulo',
          neighborhood: 'Vila Carrao',
          street: 'Rua Lobo',
          street_number: '999',
          zipcode: '03424030',
        },
      },
      items: [
        {
          id: 'a123',
          title: 'Trono de Ferro',
          unit_price: 120000,
          quantity: 1,
          tangible: true,
        },
        {
          id: 'b123',
          title: 'Capa Negra de Inverno',
          unit_price: 30000,
          quantity: 1,
          tangible: true,
        },
      ],
    };

    const order = await createOrder.execute({ user_id: user.id, paymentInfo });

    expect(order.user_id).toBe(user.id);
    expect(order.cart_id).toEqual(cartProducts[0].cart_id);
  });
  it('should not be able to create a order with a invalid user', async () => {
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

    await createCartProduct.execute({
      user_id: user.id,
      products_ids: [product1.id, product2.id],
    });

    const paymentInfo: ICreateTransactionDTO = {
      amount: 10000,
      card_number: '4111111111111111',
      card_holder_name: 'abc',
      card_expiration_date: '1225',
      card_cvv: '123',
      customer: {
        external_id: '#123456789',
        name: 'João das Neves',
        type: 'individual',
        country: 'br',
        email: 'joaoneves@norte.com',
        documents: [
          {
            type: 'cpf',
            number: '30621143049',
          },
        ],
        phone_numbers: ['+5511999999999', '+5511888888888'],
        birthday: '1985-01-01',
      },
      billing: {
        name: 'João das Neves',
        address: {
          country: 'br',
          state: 'SP',
          city: 'São Paulo',
          neighborhood: 'Vila Carrao',
          street: 'Rua Lobo',
          street_number: '999',
          zipcode: '03424030',
        },
      },
      shipping: {
        name: 'João das Neves',
        fee: 1000,
        delivery_date: '2017-12-25',
        expedited: true,
        address: {
          country: 'br',
          state: 'SP',
          city: 'São Paulo',
          neighborhood: 'Vila Carrao',
          street: 'Rua Lobo',
          street_number: '999',
          zipcode: '03424030',
        },
      },
      items: [
        {
          id: 'a123',
          title: 'Trono de Ferro',
          unit_price: 120000,
          quantity: 1,
          tangible: true,
        },
        {
          id: 'b123',
          title: 'Capa Negra de Inverno',
          unit_price: 30000,
          quantity: 1,
          tangible: true,
        },
      ],
    };

    await expect(
      createOrder.execute({
        user_id: 'invalid_user',
        paymentInfo,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a order without a paymentinfo', async () => {
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

    await createCartProduct.execute({
      user_id: user.id,
      products_ids: [product1.id, product2.id],
    });

    await expect(
      createOrder.execute({
        user_id: user.id,
        paymentInfo: undefined,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should bot be able to create a order with diference between user_id and paymentInfo costumerId', async () => {
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

    await createCartProduct.execute({
      user_id: user.id,
      products_ids: [product1.id, product2.id],
    });

    const paymentInfo: ICreateTransactionDTO = {
      amount: 10000,
      card_number: '4111111111111111',
      card_holder_name: 'abc',
      card_expiration_date: '1225',
      card_cvv: '123',
      customer: {
        external_id: '#123456789',
        name: 'João das Neves',
        type: 'individual',
        country: 'br',
        email: 'joaoneves@norte.com',
        documents: [
          {
            type: 'cpf',
            number: '30621143049',
          },
        ],
        phone_numbers: ['+5511999999999', '+5511888888888'],
        birthday: '1985-01-01',
      },
      billing: {
        name: 'João das Neves',
        address: {
          country: 'br',
          state: 'SP',
          city: 'São Paulo',
          neighborhood: 'Vila Carrao',
          street: 'Rua Lobo',
          street_number: '999',
          zipcode: '03424030',
        },
      },
      shipping: {
        name: 'João das Neves',
        fee: 1000,
        delivery_date: '2017-12-25',
        expedited: true,
        address: {
          country: 'br',
          state: 'SP',
          city: 'São Paulo',
          neighborhood: 'Vila Carrao',
          street: 'Rua Lobo',
          street_number: '999',
          zipcode: '03424030',
        },
      },
      items: [
        {
          id: 'a123',
          title: 'Trono de Ferro',
          unit_price: 120000,
          quantity: 1,
          tangible: true,
        },
        {
          id: 'b123',
          title: 'Capa Negra de Inverno',
          unit_price: 30000,
          quantity: 1,
          tangible: true,
        },
      ],
    };

    await expect(
      createOrder.execute({ user_id: user.id, paymentInfo }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a order with status paid if all information are correct', async () => {
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

    await createCartProduct.execute({
      user_id: user.id,
      products_ids: [product1.id, product2.id],
    });

    const paymentInfo: ICreateTransactionDTO = {
      amount: 10000,
      card_number: '4111111111111111',
      card_holder_name: 'abc',
      card_expiration_date: '1225',
      card_cvv: '123',
      customer: {
        external_id: user.id,
        name: 'João das Neves',
        type: 'individual',
        country: 'br',
        email: 'joaoneves@norte.com',
        documents: [
          {
            type: 'cpf',
            number: '30621143049',
          },
        ],
        phone_numbers: ['+5511999999999', '+5511888888888'],
        birthday: '1985-01-01',
      },
      billing: {
        name: 'João das Neves',
        address: {
          country: 'br',
          state: 'SP',
          city: 'São Paulo',
          neighborhood: 'Vila Carrao',
          street: 'Rua Lobo',
          street_number: '999',
          zipcode: '03424030',
        },
      },
      shipping: {
        name: 'João das Neves',
        fee: 1000,
        delivery_date: '2017-12-25',
        expedited: true,
        address: {
          country: 'br',
          state: 'SP',
          city: 'São Paulo',
          neighborhood: 'Vila Carrao',
          street: 'Rua Lobo',
          street_number: '999',
          zipcode: '03424030',
        },
      },
      items: [
        {
          id: 'a123',
          title: 'Trono de Ferro',
          unit_price: 120000,
          quantity: 1,
          tangible: true,
        },
        {
          id: 'b123',
          title: 'Capa Negra de Inverno',
          unit_price: 30000,
          quantity: 1,
          tangible: true,
        },
      ],
    };
    const order = await createOrder.execute({ user_id: user.id, paymentInfo });

    expect(order.status).toBe('paid');
  });

  it('should be able to create a order with status paid if all information are correct', async () => {
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

    await createCartProduct.execute({
      user_id: user.id,
      products_ids: [product1.id, product2.id],
    });

    jest
      .spyOn(fakePaymentProvider, 'execute')
      .mockImplementationOnce(async () => {
        return 'refused';
      });

    const paymentInfo: ICreateTransactionDTO = {
      amount: 10000,
      card_number: 'invalid information',
      card_holder_name: 'abc',
      card_expiration_date: '1225',
      card_cvv: '123',
      customer: {
        external_id: user.id,
        name: 'João das Neves',
        type: 'individual',
        country: 'br',
        email: 'joaoneves@norte.com',
        documents: [
          {
            type: 'cpf',
            number: '30621143049',
          },
        ],
        phone_numbers: ['+5511999999999', '+5511888888888'],
        birthday: '1985-01-01',
      },
      billing: {
        name: 'João das Neves',
        address: {
          country: 'br',
          state: 'SP',
          city: 'São Paulo',
          neighborhood: 'Vila Carrao',
          street: 'Rua Lobo',
          street_number: '999',
          zipcode: '03424030',
        },
      },
      shipping: {
        name: 'João das Neves',
        fee: 1000,
        delivery_date: '2017-12-25',
        expedited: true,
        address: {
          country: 'br',
          state: 'SP',
          city: 'São Paulo',
          neighborhood: 'Vila Carrao',
          street: 'Rua Lobo',
          street_number: '999',
          zipcode: '03424030',
        },
      },
      items: [
        {
          id: 'a123',
          title: 'Trono de Ferro',
          unit_price: 120000,
          quantity: 1,
          tangible: true,
        },
        {
          id: 'b123',
          title: 'Capa Negra de Inverno',
          unit_price: 30000,
          quantity: 1,
          tangible: true,
        },
      ],
    };
    const order = await createOrder.execute({ user_id: user.id, paymentInfo });

    expect(order.status).toBe('refused');
  });
});
