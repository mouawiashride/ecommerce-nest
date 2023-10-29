import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
@Entity({ name: 'reviews' })
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ratings: number;

  @Column()
  comment: string;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

  @ManyToOne((type) => User, (user) => user.reviews)
  user: User;

  @ManyToOne((type) => Product, (product) => product.reviews)
  product: Product;
}
