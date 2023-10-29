import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadedFile } from '@nestjs/common/decorators';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

import { CreateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Get User' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: User,
  })
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Get('user/Get')
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Get Current User' })
  findCurrent(@Request() req: any) {
    return this.userService.findOne(req.user.id);
  }

  @Post('create')
  @UseInterceptors(
    FileInterceptor('PersonalImage', {
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
  create(
    @UploadedFile() PersonalImage: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.userService.create(createUserDto, PersonalImage);
  }
}
