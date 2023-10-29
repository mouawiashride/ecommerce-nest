import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';

import config from 'ormconfig';
import { LocalFilesModule } from './local-files/local-files.module';
import { OrdersModule } from './orders/orders.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CartsService } from './carts/carts.service';
import { CartsController } from './carts/carts.controller';
import { CartsModule } from './carts/carts.module';
import { CartsModule } from './carts/carts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UserModule,
    AuthModule,
    CategoriesModule,
    ProductsModule,
    LocalFilesModule,
    OrdersModule,
    ReviewsModule,
    CartsModule,
  ],
  providers: [CartsService],
  controllers: [CartsController],
})
export class AppModule {}
