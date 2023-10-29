import { Module,forwardRef } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { UserModule } from 'src/user/user.module';
import { LocalFilesModule } from 'src/local-files/local-files.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]),UserModule,LocalFilesModule,CategoriesModule,forwardRef(()=>OrdersModule)],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports:[ProductsService]
})
export class ProductsModule {}
