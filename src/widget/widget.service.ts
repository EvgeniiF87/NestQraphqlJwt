import { Injectable } from '@nestjs/common';
import { CreateWidgetInput } from './dto/create-widget.input';
import { UpdateWidgetInput } from './dto/update-widget.input';
import { InjectRepository } from '@nestjs/typeorm';
import { WidgetEntity } from './entities/widget.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WidgetService {
  constructor(
    @InjectRepository(WidgetEntity)
    private readonly WidgetRepository: Repository<WidgetEntity>,
  ) {}

  async create(createWidgetInput: CreateWidgetInput) {
    return await this.WidgetRepository.save({ ...createWidgetInput });
  }

  async findAll() {
    const widgets = await this.WidgetRepository.find({
      relations: {
        body: {
          event: true,
          place: true,
        },
      },
      order: {
        sort: 'ASC',
      },
    });

    return await this.convertDataFindAll(widgets);
  }

  async findOne(id: number) {
    const widget = await this.WidgetRepository.findOne({
      where: { id },
      relations: {
        body: {
          event: true,
          place: true,
        },
      },
    });

    return await this.convertDataFindOne(widget);
  }

  async update(id: number, updateWidgetInput: UpdateWidgetInput) {
    return await this.WidgetRepository.update({ id }, { ...updateWidgetInput });
  }

  async remove(id: number) {
    const isExist = await this.WidgetRepository.findOneBy({ id });

    if (!isExist)
      return { message: `событие с id: ${id} не найдено`, status: 'error' };

    if (isExist) {
      await this.WidgetRepository.delete({ id });
      const isRemove = await this.WidgetRepository.findOneBy({ id });
      if (!isRemove) {
        return {
          id,
          message: `виджет с id: ${id} успешно удалён`,
          status: 'success',
        };
      } else {
        return { message: `виджет с id: ${id} не удалён`, status: 'error' };
      }
    }
  }

  private async convertDataFindAll(defaultWidgets: WidgetEntity[]) {
    const widgets = [];

    for (let i = 0; i < defaultWidgets.length; i++) {
      const w = defaultWidgets[i];
      const wBody = defaultWidgets[i].body;
      const widget = {};
      const body = [];

      widget['id'] = w.id;
      widget['type'] = w.type;
      widget['active'] = w.active;
      widget['sort'] = w.sort;
      widget['title'] = w.title;

      if (wBody.length) {
        wBody.forEach((elem) => {
          if (elem.event) {
            body.push({
              id: elem.event.id,
              title: elem.event.title,
              preview: elem.event.preview,
              entity: 'event',
            });
          }
          if (elem.place) {
            body.push({
              id: elem.place.id,
              title: elem.place.title,
              preview: elem.place.preview,
              entity: 'place',
            });
          }
        });

        widget['body'] = body;
      } else {
        widget['body'] = [];
      }

      widgets.push(widget);
    }

    return widgets;
  }

  private async convertDataFindOne(defaultWidget: WidgetEntity) {
    const wBody = defaultWidget.body;
    const widget = {};
    const body = [];

    widget['id'] = defaultWidget.id;
    widget['type'] = defaultWidget.type;
    widget['active'] = defaultWidget.active;
    widget['sort'] = defaultWidget.sort;
    widget['title'] = defaultWidget.title;

    if (wBody.length) {
      wBody.forEach((elem) => {
        if (elem.event) {
          body.push({
            id: elem.event.id,
            title: elem.event.title,
            preview: elem.event.preview,
            entity: 'event',
          });
        }
        if (elem.place) {
          body.push({
            id: elem.place.id,
            title: elem.place.title,
            preview: elem.place.preview,
            entity: 'place',
          });
        }
      });

      widget['body'] = body;
    } else {
      widget['body'] = [];
    }

    return widget;
  }
}
