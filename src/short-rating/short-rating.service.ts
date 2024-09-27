import { Injectable } from '@nestjs/common';
import { CreateShortRatingInput } from './dto/create-short-rating.input';
import { UpdateShortRatingInput } from './dto/update-short-rating.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ShortRatingEntity } from './entities/short-rating.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShortRatingService {
  constructor(
    @InjectRepository(ShortRatingEntity)
    private readonly shortRatingRepository: Repository<ShortRatingEntity>,
  ) {}

  async create(createShortRatingInput: CreateShortRatingInput) {
    return await this.shortRatingRepository.save({ ...createShortRatingInput });
  }

  findAll() {
    return `This action returns all shortRating`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shortRating`;
  }

  async update(id: number, updateShortRatingInput: UpdateShortRatingInput) {
    return await this.shortRatingRepository.update(
      { id },
      { ...updateShortRatingInput },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} shortRating`;
  }
}
