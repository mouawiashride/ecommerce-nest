import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  HttpCode,
  Request,
  UploadedFile,
  UseGuards,
} from '@nestjs/common/decorators';

import { User } from 'src/user/entities/user.entity';
@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll() {
    return await this.categoriesService.findAll();
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('token')
  @ApiBody({ type: CreateCategoryDto })
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
  @Post()
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() Image: Express.Multer.File,
    @Request() req: any,
  ) {
    return this.categoriesService.create(createCategoryDto, req.user.id, Image);
  }

  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth('token')
  @ApiBody({ type: UpdateCategoryDto })
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
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('token')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
