import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { LocalFilesService } from 'src/local-files/local-files.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    private readonly UserService: UserService,
    private readonly LocalFilesService: LocalFilesService,
  ) {}
  async create(
    createCategoryDto: CreateCategoryDto,
    UserId: number,
    Image: Express.Multer.File,
  ) {
    const NewCategory = this.categoryRepo.create(createCategoryDto);

    if (Image) {
      const avatar = await this.LocalFilesService.create({
        filename: Image.originalname,
        mimetype: Image.mimetype,
        path: Image.fieldname,
      });
      NewCategory.Icon = avatar;
    }

    const user = await this.UserService.findOne(UserId);

    NewCategory.addedBy = user;
    return await this.categoryRepo.save(NewCategory);
  }

  async findAll() {
    return await this.categoryRepo.find({
      relations: {
        addedBy: true,
      },
    });
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`category with id:${id} not found`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    Object.assign(category, updateCategoryDto);
    return await this.categoryRepo.save(category);
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.categoryRepo.delete(id);
  }
}
