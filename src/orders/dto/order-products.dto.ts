import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderdProductsDto {
  @ApiProperty({
    description: ' id of  product',
    example:1
  })
  @IsNotEmpty({ message: "Product can't be empty" })
  id: number;

  @ApiProperty({
    description: 'unit price of product',
    example:20
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'product_unit_price should be number and max decimal precission 2',
    },
  )
  @IsPositive({ message: "product_unit_price can't be negative" })
  product_unit_price: number;


  @ApiProperty({
    description: 'quantity of products',
    example:20
  })
  @IsNumber(
    {},
    {
      message: 'Quantity should be number ',
    },
  )
  @IsPositive({ message: "Quantity can't be negative" })
  product_quantity: number;
}
