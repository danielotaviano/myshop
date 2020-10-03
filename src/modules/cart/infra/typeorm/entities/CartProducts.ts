import Product from '@modules/product/infra/typeorm/entities/Product';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Cart from './Cart';

@Entity('cart_product')
export default class CartProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  cart_id: string;

  @ManyToOne(() => Cart)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @Column('uuid')
  product_id: string;

  @ManyToMany(() => Product)
  @JoinColumn({ name: 'product_id' })
  orderproducts: Product[];
}