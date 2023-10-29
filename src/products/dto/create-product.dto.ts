import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';

export class CreateProductDto {
  @ApiProperty({ name: 'title' })
  @IsString()
  title: string;

  @ApiProperty({ name: 'description' })
  @IsString()
  description: string;

  @ApiProperty({ name: 'price' })
  @Type(() => Number)
  @IsNotEmpty({ message: "price Can't be Empty" })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'price should be number & decimal precission 2' },
  )
  @IsPositive({ message: 'price should be positive number' })
  price: number;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
  })
  Image: Express.Multer.File;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    required: true,
  })
  Images: Express.Multer.File[];

  @Type(() => Number)
  @ApiProperty({ name: 'stock' })
  @IsNotEmpty({ message: "stock Can't be Empty" })
  @IsNumber({}, { message: 'price should be number ' })
  @Min(0, { message: "stock can't be negative" })
  stock: number;

  @Type(() => Number)
  @ApiProperty({ name: 'categoryId' })
  @IsNotEmpty({ message: "categoryId Can't be Empty" })
  @IsNumber({}, { message: 'categoryId  should be number ' })
  categoryId: number;
}
