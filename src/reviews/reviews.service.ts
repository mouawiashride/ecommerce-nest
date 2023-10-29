import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private readonly review: Repository<Review>,
    private readonly ProductService: ProductsService,
    private readonly UserService:UserService
  ) {}

  async create(
    createReviewDto: CreateReviewDto,
    UserId: number,
  ): Promise<Review> {
    const product = await this.ProductService.findOne(
      createReviewDto.productId,
    );

  

    let review = await this.findOneByUserAndProduct(
      UserId,
      createReviewDto.productId,
    );
    const user = await this.UserService.findOne(UserId);

    if (!review) {
      review = this.review.create(createReviewDto);
      review.user = user;
      review.product = product;
    } else {
      review.comment = createReviewDto.comment;
      review.ratings = createReviewDto.ratings;
    }
    return await this.review.save(review);
  }

  async findAllByProduct(id: number): Promise<Review[]> {
    const product = await this.ProductService.findOne(id);

    return await this.review.find({
      where: {
        product: { id },
      },
      relations: {
        user: true,
        product: {
          category: true,
        },
      },
    });
  }

  findAll() {
    return this.review.find();
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.review.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
        product: {
          category: true,
        },
      },
    });
    if (!review) throw new NotFoundException('Review not found');
    return await review;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  async remove(id: number) {
    const review = await this.findOne(id);
    if (!review) throw new NotFoundException('Review is not found');
    return this.review.remove(review);
  }

  async findOneByUserAndProduct(userId: number, productId: number) {
    return await this.review.findOne({
      where: {
        user: {
          id: userId,
        },
        product: {
          id: productId,
        },
      },
      relations: {
        user: true,
        product: {
          category: true,
        },
      },
    });
  }
}
