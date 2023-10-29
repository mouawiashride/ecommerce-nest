import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/createUserDto';
import { User } from './entities/user.entity';
import { LocalFilesService } from 'src/local-files/local-files.service';
import { CreateLocalFileDto } from 'src/local-files/dto/create-local-file.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly LocalFiles: LocalFilesService,
  ) {}
  async findOne(id: number): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) {
      throw new BadRequestException('user Not Found');
    }
    return user;
  }

  async findOneWithEmail(email: string) {
    return await this.userRepo.findOne({
      where: { email },
      select: {
        id: true,
        password: true,
        email: true,
        name: true,
      },
    });
  }

  async findOneWithName(name: string) {
    return await this.userRepo.findOne({ where: { name } });
  }

  async create(
    createUserDto: CreateUserDto,
    PersonalImage: Express.Multer.File,
  ) {
    if (await this.findOneWithName(createUserDto.name)) {
      throw new BadRequestException("the name isn't available");
    }
    if (await this.findOneWithEmail(createUserDto.email)) {
      throw new BadRequestException("the email isn't available");
    }
    const user = this.userRepo.create(createUserDto);

    if (PersonalImage) {
      const avatar = await this.LocalFiles.create({
        filename: PersonalImage.originalname,
        mimetype: PersonalImage.mimetype,
        path: PersonalImage.fieldname,
      });
      user.avatar = avatar;
    }
    await this.userRepo.save(user);

    const { password, ...result } = user;
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepo.update(id, updateUserDto);
  }
}
