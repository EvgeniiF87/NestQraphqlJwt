import { Injectable } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestCities } from './dto/request-cities.input';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly CityRepository: Repository<CityEntity>,
  ) {}

  async findAll(params: RequestCities) {
    return await this.CityRepository.find({
      take: params?.take && params?.take,
      skip: params?.skip && params?.skip,
      order: { name: 'ASC' },
    });
  }

  async findAllEventsAndPlaces(id: number) {
    return await this.CityRepository.find({
      where: { id },
      relations: {
        events: true,
        places: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.CityRepository.findOneBy({ id });
  }
}
