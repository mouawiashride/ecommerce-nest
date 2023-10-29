import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { ApiProperty } from '@nestjs/swagger';
import { Roles } from 'src/utility/common/user-roles';
import { Category } from 'src/categories/entities/category.entity';
import { Product } from 'src/products/entities/product.entity';
import { LocalFile } from 'src/local-files/entities/local-file.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Order } from 'src/orders/entities/order.entity';
@Entity()
export class User {
  @ApiProperty({ example: 1, description: 'The id of User' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'samer', description: 'The name of User' })
  @Column({ unique: true, nullable: false })
  name: string;

  @ApiProperty({ example: 'test@gamil.com', description: 'The email of User' })
  @Column({ nullable: false, unique: true })
  email: string;

  @ApiProperty({
    example: 'strong password',
    description: 'The password of User',
  })
  @Column({ nullable: false, select: false })
  password: string;

  @OneToMany(() => Category, (category) => category.addedBy)
  categories: Category[];

  @JoinColumn()
  @OneToOne(() => LocalFile, (file) => file.id)
  public avatar: LocalFile;

  @Column({ type: 'enum', enum: Roles, array: true, default: [Roles.USER] })
  roles: Roles[];

  @OneToMany(() => Product, (product) => product.addedBy)
  products: Product[];

  @BeforeInsert()
  async hashPasword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Order, (order) => order.updatedBy)
  ordersUpdateBy: Order[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
