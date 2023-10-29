import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsNumberString, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ name: 'name' })
  @IsString()
  name: string;

  @ApiProperty({ name: 'email' })
  @IsEmail()
  email: string;

  @ApiProperty({ name: 'password' })
  @IsString()
  password: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  PersonalImage: Express.Multer.File;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
