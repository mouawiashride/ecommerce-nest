import { Type } from 'class-transformer';
import { CreateShippingDto } from './create-shipping.dto';
import { ValidateNested } from 'class-validator';
import { OrderdProductsDto } from './order-products.dto';
import { ApiProperty } from '@nestjs/swagger';
export class CreateOrderDto {
  @ApiProperty({
    description: 'shippingAddress of order',
    type:CreateShippingDto,
    isArray:false,
  })
  @Type(() => CreateShippingDto)
  @ValidateNested()
  shippingAddress: CreateShippingDto;

  @ApiProperty({
    description: 'Products of order',type:OrderdProductsDto,isArray:true
  })
  @Type(() => OrderdProductsDto)
  @ValidateNested()
  orderedProducts: OrderdProductsDto[];
}
