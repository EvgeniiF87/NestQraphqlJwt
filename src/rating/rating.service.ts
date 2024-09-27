import { Injectable } from '@nestjs/common';
import { CreateRatingInput } from './dto/create-rating.input';
import { UpdateRatingInput } from './dto/update-rating.input';
import { InjectRepository } from '@nestjs/typeorm';
import { RatingEntity } from './entities/rating.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly RatingRepository: Repository<RatingEntity>,
  ) {}

  create(createRatingInput: CreateRatingInput) {
    return 'This action adds a new rating';
  }

  findAll() {
    return `This action returns all rating`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rating`;
  }

  update(id: number, updateRatingInput: UpdateRatingInput) {
    return `This action updates a #${id} rating`;
  }

  remove(id: number) {
    return `This action removes a #${id} rating`;
  }
}
