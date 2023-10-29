import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

import { Review } from './entities/review.entity';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';



@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}


  @UseGuards(JwtGuard)
  @ApiBearerAuth('token')
  @ApiBody({ type: CreateReviewDto })
  @Post()
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @Request() req: any,
  ): Promise<Review> {
    return await this.reviewsService.create(createReviewDto, req.user.id);
  }


  
  @Get()
  async findAllByProduct(@Body('productId') productId: number) {
    return await this.reviewsService.findAllByProduct(+productId);
  }


  @Get('/all')
  async findAll() {
    return await this.reviewsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Review> {
    return await this.reviewsService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('token')
  @ApiBody({ type: UpdateReviewDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('token')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
