import { Injectable } from '@nestjs/common';
import { CreateStatisticInput } from './dto/create-statistic.input';
import { InjectRepository } from '@nestjs/typeorm';
import { StatisticEntity } from './entities/statistic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(StatisticEntity)
    private readonly statisticRepository: Repository<StatisticEntity>,
  ) {}

  async create(createStatisticInput: CreateStatisticInput) {
    return await this.statisticRepository.save({ ...createStatisticInput });
  }

  async findOne(id: number) {
    return await this.statisticRepository.findOne({ where: { userId: id } });
  }
}
