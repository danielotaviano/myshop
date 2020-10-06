import AppError from '@shared/err/AppError';
import { injectable, inject } from 'inversify';
import IHashProvider from '../providers/HashProvider/model/IHashProvider';
import ITokenProvider from '../providers/TokenProvider/model/ITokenProvider';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
export default class CreateSessionService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) {}

  public async execute({ password, email }: IRequest): Promise<string> {
    if (!email) {
      throw new AppError('Email not provided');
    }
    if (!password) {
      throw new AppError('Password not provided');
    }

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('One of these credentials is invalid');
    }

    const isSamePassword = await this.hashProvider.compare(
      password,
      user.password,
    );

    if (!isSamePassword) {
      throw new AppError('One of these credentials is invalid');
    }

    const token = await this.tokenProvider.generate(user.id);

    return token;
  }
}
