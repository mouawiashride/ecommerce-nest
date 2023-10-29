import { LocalFile } from 'src/local-files/entities/local-file.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Timestamp,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
  OneToMany,
  Entity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  slug: string;
  @Column()
  Shortdescription: string;
  @Column()
  Longdescription: string;
  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

  @JoinColumn()
  @OneToOne(() => LocalFile, (file) => file.id,{cascade:true})
  Icon: LocalFile;



  @ManyToOne(() => User, (user) => user.categories, { nullable: false })
  addedBy: User;

  @OneToMany(() => Product, (product) => product.category, {})
  products: Product[];
}
