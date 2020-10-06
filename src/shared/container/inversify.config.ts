import CartProductRepository from '@modules/cart/infra/typeorm/repositories/CartProductRepository';
import CartRepository from '@modules/cart/infra/typeorm/repositories/CartRepository';
import ICartProductRepository from '@modules/cart/repositories/ICartProductRepository';
import ICartRepository from '@modules/cart/repositories/ICartRepository';
import ProductRepository from '@modules/product/infra/typeorm/repositories/ProductRepository';
import IProductRepository from '@modules/product/repositories/IProductRepository';
import UserRepository from '@modules/user/infra/typeorm/repositories/UserRepository';
import HashProvider from '@modules/user/providers/HashProvider/implementations/HashProvider';
import IHashProvider from '@modules/user/providers/HashProvider/model/IHashProvider';
import TokenProvider from '@modules/user/providers/TokenProvider/implementations/TokenProvider';
import ITokenProvider from '@modules/user/providers/TokenProvider/model/ITokenProvider';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import { Container } from 'inversify';

const container = new Container();

container.bind<IUserRepository>('UserRepository').to(UserRepository);
container.bind<IHashProvider>('HashProvider').to(HashProvider);
container.bind<IProductRepository>('ProductRepository').to(ProductRepository);
container.bind<ICartRepository>('CartRepository').to(CartRepository);
container
  .bind<ICartProductRepository>('CartProductRepository')
  .to(CartProductRepository);

container.bind<ITokenProvider>('TokenProvider').to(TokenProvider);

export default container;
