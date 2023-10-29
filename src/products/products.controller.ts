import { HttpCode } from '@nestjs/common/decorators';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
  HttpStatus,
  UseInterceptors,
  UseGuards,
  UploadedFiles,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { extname } from 'path';
import { diskStorage } from 'multer';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiPaginatedResponse,
  PageDto,
  PageOptionsDto,
} from 'src/utility/DTO/index';
import { Product } from './entities/product.entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @UseInterceptors(
  //   FileInterceptor('Image', {
  //     storage: diskStorage({
  //       destination: './files',
  //       filename: (req, file, callback) => {
  //         const uniquesuffix =
  //           Date.now() + '-' + Math.round(Math.random() * 1e9);
  //         const ext = extname(file.originalname);
  //         const filename = `${uniquesuffix}${ext}`;
  //         callback(null, filename);
  //       },
  //     }),
  //   }),
  // )
  @UseGuards(JwtGuard)
  @ApiBearerAuth('token')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'Image',
          maxCount: 1,
        },
        {
          name: 'Images',
          maxCount: 5,
        },
      ],
      {
        storage: diskStorage({
          destination: './files',
          filename: (req, file, callback) => {
            const uniquesuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            const filename = `${uniquesuffix}${ext}`;
            callback(null, filename);
          },
        }),
      },
    ),
  )
  @ApiBody({ type: CreateProductDto })
  @ApiConsumes('multipart/form-data')
  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles()
    files: {
      Image: Express.Multer.File[];
      Images: Express.Multer.File[];
    },
    @Request() req: any,
  ) {
    return this.productsService.create(
      createProductDto,
      req.user.id,
      files.Image[0],
      files.Images,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(Product)
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Product>> {
    return await this.productsService.findAll(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('token')
  @ApiBody({ type: UpdateProductDto })
  @UseInterceptors(
    FileInterceptor('Image', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callback) => {
          const uniquesuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniquesuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('token')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
