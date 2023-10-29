import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ name: 'title' })
  @IsString()
  title: string;
  @ApiProperty({ name: 'slug' })
  @IsString()
  slug: string;

  @ApiProperty({ name: 'Shortdescription' })
  @IsString()
  Shortdescription: string;
  @ApiProperty({ name: 'Longdescription' })
  @IsString()
  Longdescription: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  Image: Express.Multer.File;
}
