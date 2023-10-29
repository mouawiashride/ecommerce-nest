import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty({ message: "product shouldn't be empty" })
  @IsNumber({}, { message: 'product id should be number' })
  productId: number;
  @IsNotEmpty({ message: "product shouldn't be empty" })
  @IsNumber({}, { message: 'ratings id should be number' })
  ratings: number;
  @IsNotEmpty({ message: "comment shouldn't be empty" })
  @IsString({ message: "product should be string" })

  comment: string;
}
