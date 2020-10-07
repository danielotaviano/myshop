import Product from '@modules/product/infra/typeorm/entities/Product';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Cart from './Cart';

@Entity('cart_product')
export default class CartProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  cart_id: string;

  @Column('numeric')
  price: number;

  @ManyToOne(() => Cart)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @Column('uuid')
  product_id: string;

  @OneToOne(() => Product, { eager: true })
  @JoinColumn({ name: 'product_id' })
  orderproducts: Product[];
}
