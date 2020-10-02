import AppError from '@shared/err/AppError';
import FakeHashProvider from '../providers/HashProvider/fake/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';

describe('CreateUserService', () => {
  let fakeUserRepository: FakeUserRepository;
  let createUser: CreateUserService;
  let fakeHashProvider: FakeHashProvider;

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
  });

  it('should be able to create a user', async () => {
    const user = await createUser.execute({
      email: 'email@exemple.com',
      name: 'Name Exemple',
      password: 'passwordexemple',
      password_confirmation: 'passwordexemple',
    });

    expect(user).toHaveProperty('password');

    expect(user.name).toBe('Name Exemple');
    expect(user.email).toBe('email@exemple.com');
  });

  it('should not be able to create a user without a email', async () => {
    await expect(
      createUser.execute({
        email: '',
        name: 'Name Exemple',
        password: 'passwordexemple',
        password_confirmation: 'passwordexemple',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a user without a name', async () => {
    await expect(
      createUser.execute({
        email: 'email@exemple.com',
        name: '',
        password: 'passwordexemple',
        password_confirmation: 'passwordexemple',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a user without a password', async () => {
    await expect(
      createUser.execute({
        email: 'email@exemple.com',
        name: 'Name Exemple',
        password: '',
        password_confirmation: 'passwordexemple',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a user without a password confirmation', async () => {
    await expect(
      createUser.execute({
        email: 'email@exemple.com',
        name: 'Name Exemple',
        password: 'passwordexemple',
        password_confirmation: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a user if password and password confirmation didnt match', async () => {
    await expect(
      createUser.execute({
        email: 'email@exemple.com',
        name: 'Name Exemple',
        password: 'passwordexemple',
        password_confirmation: 'wrongpasswordconfirmation',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a user if the email that was provided is already in use', async () => {
    await createUser.execute({
      email: 'email@duplicated.com',
      name: 'Name Exemple',
      password: 'passwordexemple',
      password_confirmation: 'passwordexemple',
    });

    await expect(
      createUser.execute({
        email: 'email@duplicated.com',
        name: 'Name Exemple',
        password: 'passwordexemple',
        password_confirmation: 'passwordexemple',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a user and save a hashed password', async () => {
    const createHash = jest.spyOn(fakeHashProvider, 'create');
    await createUser.execute({
      email: 'email@exemple.com',
      name: 'Name Exemple',
      password: 'passwordexemple',
      password_confirmation: 'passwordexemple',
    });

    expect(createHash).toBeCalledWith('passwordexemple');
  });
});
