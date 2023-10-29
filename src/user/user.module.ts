import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/user/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MulterModule } from '@nestjs/platform-express';
import { LocalFilesModule } from 'src/local-files/local-files.module';

@Module({
  imports: [LocalFilesModule,TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
