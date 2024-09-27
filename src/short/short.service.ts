import { Injectable } from '@nestjs/common';
import { CreateShortInput } from './dto/create-short.input';
import { UpdateShortInput } from './dto/update-short.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ShortEntity } from './entities/short.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShortService {
  constructor(
    @InjectRepository(ShortEntity)
    private readonly shortRepository: Repository<ShortEntity>,
  ) {}

  async create(createShortInput: CreateShortInput) {
    return await this.shortRepository.save({ ...createShortInput });
  }

  async findAll() {
    return await this.shortRepository.find();
  }

  async findOne(id: number) {
    return await this.shortRepository.findOneBy({ id });
  }

  async update(id: number, updateShortInput: UpdateShortInput) {
    return await this.shortRepository.update({ id }, { ...updateShortInput });
  }

  remove(id: number) {
    return `This action removes a #${id} short`;
  }
}
