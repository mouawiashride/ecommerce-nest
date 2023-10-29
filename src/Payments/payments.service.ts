import { Injectable } from '@nestjs/common';
import { CreateLocalFileDto } from './dto/create-local-file.dto';
import { UpdateLocalFileDto } from './dto/update-local-file.dto';
import { Req } from '@nestjs/common/decorators';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { LocalFile } from './entities/local-file.entity';
import { Repository } from 'typeorm';
@Injectable()
export class LocalFilesService {
  constructor(
    @InjectRepository(LocalFile) private LocalFileRepo: Repository<LocalFile>,
  ) {}

  async create(createLocalFileDto: CreateLocalFileDto) {
    const NewFile = this.LocalFileRepo.create(createLocalFileDto);
    return await this.LocalFileRepo.save(NewFile);
  }

  findAll() {
    return `This action returns all localFiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} localFile`;
  }

  update(id: number, updateLocalFileDto: UpdateLocalFileDto) {
    return `This action updates a #${id} localFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} localFile`;
  }
}
