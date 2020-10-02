import AppError from '@shared/err/AppError';
import { inject, injectable } from 'inversify';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/model/IHashProvider';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
@injectable()
export default class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    name,
    password,
    password_confirmation,
  }: IRequest): Promise<User> {
    if (!email) {
      throw new AppError('Email not provided');
    }

    if (!name) {
      throw new AppError('Name not provided');
    }

    if (!password) {
      throw new AppError('Password not provided');
    }

    if (!password_confirmation) {
      throw new AppError('Password confirmation has not provided');
    }

    if (password_confirmation !== password) {
      throw new AppError('Password confirmation and password didnt match');
    }

    const isEmailAlreadyInUse = await this.userRepository.findByEmail(email);

    if (isEmailAlreadyInUse) {
      throw new AppError('This Email is already in use');
    }

    const hashedPassword = await this.hashProvider.create(password);

    const user = await this.userRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return user;
  }
}
