import ICreateUserDTO from '../../../dtos/ICreateUserDTO';
import IUserRepository from '../../../repositories/IUserRepository';
import User from '../entities/User';
import { getRepository, Repository } from 'typeorm';
import { injectable } from 'inversify';

@injectable()
export default class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;
  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = await this.ormRepository.create({ email, name, password });
    await this.ormRepository.save(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { id } });

    return user;
  }
}
