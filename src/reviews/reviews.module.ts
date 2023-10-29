import { Review } from './entities/review.entity';
import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  imports: [TypeOrmModule.forFeature([Review]), ProductsModule,UserModule],
})
export class ReviewsModule {}
