import {
  BadRequestException,
  Injectable,
  Inject,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/utility/DTO/index';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { LocalFilesService } from 'src/local-files/local-files.service';
import { LocalFile } from 'src/local-files/entities/local-file.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { OrderStatus } from 'src/orders/enums/order-status.enum';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly ProductRepo: Repository<Product>,
    private readonly UserService: UserService,
    private readonly LocalFilesService: LocalFilesService,
    private readonly CategoryService: CategoriesService,
    @Inject(forwardRef(() => OrdersService))
    private readonly orderService: OrdersService
  ) {}

  async create(
    createProductDto: CreateProductDto,
    UserId: number,
    Image: Express.Multer.File,
    Images: Array<Express.Multer.File>,
  ) {
    const NewProduct = this.ProductRepo.create({
      ...createProductDto,
    });

    // Todo v2
    // const DTOImages = [];
    // if (Images) {
    //   for (let i = 0; i < Images.length; i++) {
    //     const Img = await this.LocalFilesService.create({
    //       filename: Images[i].originalname,
    //       mimetype: Images[i].mimetype,
    //       path: Images[i].fieldname,
    //     });
    //     DTOImages.push(Img);
    //   }
    // }
    // NewProduct.Gallery = DTOImages;

    const category = await this.CategoryService.findOne(
      createProductDto.categoryId,
    );

    NewProduct.category = category;

    if (Image) {
      const avatar = await this.LocalFilesService.create({
        filename: Image.originalname,
        mimetype: Image.mimetype,
        path: Image.fieldname,
      });
      NewProduct.Icon = avatar;
    }

    const user = await this.UserService.findOne(UserId);

    if (!user) {
      throw new BadRequestException('user Not Found');
    }
    NewProduct.addedBy = user;
    console.log(NewProduct);
    return await this.ProductRepo.save(NewProduct);
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Product>> {
    const queryBuilder = this.ProductRepo.createQueryBuilder('products');

    queryBuilder
      .orderBy('products.createdAt', pageOptionsDto.order)
      .leftJoinAndSelect('products.category', 'category')
      .leftJoinAndSelect('products.Icon', 'Icon')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: number) {
    const product = await this.ProductRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        Icon: true,
      },
    });
    console.log('product');
    console.log(product);
    if (!product) {
      throw new NotFoundException(`Product with id:${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return await this.ProductRepo.save(product);
  }

  async remove(id: number) {
    await this.findOne(id);

    const product = await this.findOne(id);
    const order = await this.orderService.findOneByProductId(product.id);

    if (order) throw new BadRequestException('Products is in use');
    return await this.ProductRepo.delete(id);
  }

  async updateStock(id: number, stock: number, status: string) {
    let product = await this.findOne(id);
    if (status === OrderStatus.DELIVERED) {
      product.stock -= stock;
    } else {
      product.stock += stock;
    }

    product = await this.ProductRepo.save(product);
    return product;
  }
}
