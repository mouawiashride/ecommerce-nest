import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateShippingDto {
  @ApiProperty({
    description: 'phone number',
    example:"number"
  })
  @IsNotEmpty({ message: "phone can't be empty" })
  @IsString({ message: 'phone should be string' })
  phone: string;

  @ApiProperty({
    description: 'name of  client',
    example:"tamer"
  })
  @IsNotEmpty({ message: "name can't be empty" })
  @IsString({ message: 'name should be string' })
  name: string;

  @ApiProperty({
    description: 'address of  reciver',
    example:" salam street 3,buka"
  })
  @IsNotEmpty({ message: "address can't be empty" })
  @IsString({ message: 'address should be string' })
  address: string;

  @ApiProperty({
    description: 'city of  reciver',
    example:"buka"
  })
  @IsNotEmpty({ message: "city can't be empty" })
  @IsString({ message: 'city should be string' })
  city: string;

  @ApiProperty({
    description: 'postcode of reciver',
    example:"03215"
  })
  @IsNotEmpty({ message: "postCode can't be empty" })
  @IsString({ message: 'postCode should be string' })
  postCode: string;

  @ApiProperty({
    description: 'state of  reciver',
    example:"buka"
  })
  @IsNotEmpty({ message: "state can't be empty" })
  @IsString({ message: 'state should be string' })
  state: string;

  @ApiProperty({
    description: ' country of  reciver',
    example:"lebanon"
  })
  @IsNotEmpty({ message: "country can't be empty" })
  @IsString({ message: 'country should be string' })
  country: string;
}
