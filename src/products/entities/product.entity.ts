import { Category } from 'src/categories/entities/category.entity';
import { LocalFile } from 'src/local-files/entities/local-file.entity';
import { OrdersProducts } from 'src/orders/entities/Orders-products.entity';
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

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @OneToOne(() => LocalFile, (file) => file.id, { cascade: true })
  @JoinColumn()
  Icon: LocalFile;

  @Column()
  stock: number;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

  @ManyToOne(() => User, (user) => user.products)
  addedBy: User;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany((_type) => Review, (review) => review.product)
  reviews: Review[];
  @OneToMany(() => OrdersProducts, (orderproducts) => orderproducts.product)
  products: OrdersProducts[];
}
