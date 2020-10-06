import FakeHashProvider from '../providers/HashProvider/fake/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';
import AppError from '@shared/err/AppError';
import TokenProvider from '../providers/TokenProvider/implementations/TokenProvider';
import FakeTokenProvider from '../providers/TokenProvider/fakes/FakeTokenProvider';
import CreateSessionService from './CreateSessionService';

describe('Create a session and generate a token', () => {
  let fakeUserRepository: FakeUserRepository;
  let hashProvider: FakeHashProvider;
  let createUser: CreateUserService;
  let createSession: CreateSessionService;
  let tokenProvider: TokenProvider;

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    hashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUserRepository, hashProvider);
    tokenProvider = new FakeTokenProvider();

    createSession = new CreateSessionService(
      fakeUserRepository,
      hashProvider,
      tokenProvider,
    );
  });
  it('should be able to create a session and generate a token', async () => {
    await createUser.execute({
      email: 'email@exemple.com',
      name: 'Name Exemple',
      password: 'passwordexemple',
      password_confirmation: 'passwordexemple',
    });

    const token = await createSession.execute({
      email: 'email@exemple.com',
      password: 'passwordexemple',
    });

    expect(token).toBeTruthy();
  });
  it('should not be able to create a session without email', async () => {
    await createUser.execute({
      email: 'email@exemple.com',
      name: 'Name Exemple',
      password: 'passwordexemple',
      password_confirmation: 'passwordexemple',
    });

    await expect(
      createSession.execute({
        email: undefined,
        password: 'passwordexemple',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a session without password', async () => {
    await createUser.execute({
      email: 'email@exemple.com',
      name: 'Name Exemple',
      password: 'passwordexemple',
      password_confirmation: 'passwordexemple',
    });

    await expect(
      createSession.execute({
        email: 'email@exemple.com',
        password: undefined,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a session if credentials are invalid', async () => {
    await createUser.execute({
      email: 'email@exemple.com',
      name: 'Name Exemple',
      password: 'passwordexemple',
      password_confirmation: 'passwordexemple',
    });

    await expect(
      createSession.execute({
        email: 'wrongemail@exemple.com',
        password: 'passwordexemple',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createSession.execute({
        email: 'email@exemple.com',
        password: 'wrongpasswordexemple',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
