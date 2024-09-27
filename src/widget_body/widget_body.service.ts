import { Injectable } from '@nestjs/common';
import { CreateWidgetBodyInput } from './dto/create-widget_body.input';
import { UpdateWidgetBodyInput } from './dto/update-widget_body.input';
import { InjectRepository } from '@nestjs/typeorm';
import { WidgetBodyEntity } from './entities/widget_body.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WidgetBodyService {
  constructor(
    @InjectRepository(WidgetBodyEntity)
    private readonly WidgetBodyRepository: Repository<WidgetBodyEntity>,
  ) {}

  async create(createWidgetBodyInput: CreateWidgetBodyInput) {
    return await this.WidgetBodyRepository.save({ ...createWidgetBodyInput });
  }

  async update(id: number, updateWidgetBodyInput: UpdateWidgetBodyInput) {
    return await this.WidgetBodyRepository.update(
      { id },
      { ...updateWidgetBodyInput },
    );
  }
}
