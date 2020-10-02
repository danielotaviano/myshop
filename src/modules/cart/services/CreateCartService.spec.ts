import User from '@modules/user/infra/typeorm/entities/User';
import FakeUserRepository from '@modules/user/repositories/fakes/FakeUserRepository';
import AppError from '@shared/err/AppError';
import FakeCartRepository from '../repositories/fakes/FakeCartRepository';
import CreateCartService from './CreateCartService';

describe('CreateCartService', () => {
  let fakeCartRepository: FakeCartRepository;
  let createCart: CreateCartService;
  let fakeUserRepository: FakeUserRepository;

  beforeEach(() => {
    fakeCartRepository = new FakeCartRepository();
    fakeUserRepository = new FakeUserRepository();
    createCart = new CreateCartService(fakeCartRepository, fakeUserRepository);
  });
  it('should be able to create a cart', async () => {
    jest.spyOn(fakeUserRepository, 'findById').mockImplementation(async () => {
      const user = new User();
      user.id = 'valid_user_id';
      return new User();
    });

    const cart = await createCart.execute({
      user_id: 'valid_user_id',
    });

    console.log(cart);

    expect(cart.user_id).toBe('valid_user_id');
  });

  it('should not be able to create a cart if user id is of a inexistent user', async () => {
    await expect(
      createCart.execute({
        user_id: 'inexistent_user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
