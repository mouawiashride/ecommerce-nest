import { Module, forwardRef } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrdersProducts } from './entities/Orders-products.entity';
import { Shippings } from './entities/shipping.entity';
import { ProductsModule } from 'src/products/products.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    TypeOrmModule.forFeature([Order, OrdersProducts, Shippings]),
    UserModule,
    forwardRef(() => ProductsModule),
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
