import User from '@modules/user/infra/typeorm/entities/User';
import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import CartProduct from './CartProducts';

@Entity('carts')
export default class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => CartProduct, cartProduct => cartProduct.cart)
  cartProducts: CartProduct[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'totalPrice' })
  getTotalPrice(): number {
    const totalPrice = this.cartProducts.reduce((acc, crr) => {
      return acc + Number(crr.price);
    }, 0);
    return totalPrice;
  }
}
