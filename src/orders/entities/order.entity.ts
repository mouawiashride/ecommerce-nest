import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { OrderStatus } from '../enums/order-status.enum';

import { Shippings } from './shipping.entity';
import { OrdersProducts } from './Orders-products.entity';
import { User } from 'src/user/entities/user.entity';


@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  orderAt: Timestamp;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PROCESSING })
  status: string;

  @Column({ nullable: true })
  shippedAt: Date;

  @Column({ nullable: true })
  deliveredAt: Date;

  @ManyToOne(() => User, (user) => user.ordersUpdateBy)
  updatedBy: User;

  @OneToOne(() => Shippings, (shipping) => shipping.order, {
    cascade: true
  })
  @JoinColumn()
  shippingAddress: Shippings;

  @OneToMany(() => OrdersProducts, (orderproduct) => orderproduct.order, {
    cascade: true
  })
  products: OrdersProducts[];

  @ManyToOne(() => User, (user) => user.orders,{})
  user: User;

  
}
