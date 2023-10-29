import { Category } from 'src/categories/entities/category.entity';
import { LocalFile } from 'src/local-files/entities/local-file.entity';
import { OrdersProducts } from 'src/orders/entities/Orders-products.entity';
import { Product } from 'src/products/entities/product.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { cartsProducts } from './carts-products.entity';

@Entity({ name: 'carts' })
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  product_unit_price: number;

  @Column()
  product_quantity: number;

  @OneToMany(() => cartsProducts, (orderproduct) => orderproduct.cart, {
    cascade: true
  })
  products: cartsProducts[];
}
