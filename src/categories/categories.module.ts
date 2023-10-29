import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/category.entity';
import { UserModule } from 'src/user/user.module';
import { LocalFilesModule } from 'src/local-files/local-files.module';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [TypeOrmModule.forFeature([Category]), UserModule,LocalFilesModule],
  exports:[CategoriesService]
})
export class CategoriesModule {}
