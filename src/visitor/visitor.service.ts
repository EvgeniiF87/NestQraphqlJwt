import { Injectable } from '@nestjs/common';
import { CreateVisitorInput } from './dto/create-visitor.input';
import { InjectRepository } from '@nestjs/typeorm';
import { VisitorEntity } from './entities/visitor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VisitorService {
  constructor(
    @InjectRepository(VisitorEntity)
    private readonly visitorRepository: Repository<VisitorEntity>,
  ) {}

  async create(createVisitorInput: CreateVisitorInput) {
    return await this.visitorRepository.save({ ...createVisitorInput });
  }

  async remove(id: number) {
    return await this.visitorRepository.delete({ id });
  }
}
