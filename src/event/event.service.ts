import { Injectable } from '@nestjs/common';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from './entities/event.entity';
import {
  Between,
  ILike,
  MoreThan,
  MoreThanOrEqual,
  Raw,
  Repository,
} from 'typeorm';
import { RequestEvent } from './dto/request-event.input';
import { Periods } from 'src/request/period.type';
import {
  getStartAndEndMonth,
  getStartAndEndWeek,
  getWeekEnd,
} from 'src/helpers/date-helper';
import { add } from 'date-fns';
import { RequestDashboard } from '../request/request-dasboard.input';
import { getRating } from 'src/helpers/get-rating';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly EventRepository: Repository<EventEntity>,
  ) {}

  async getCount() {
    return await this.EventRepository.count();
  }

  async create(createEventInput: CreateEventInput) {
    return await this.EventRepository.save({ ...createEventInput });
  }

  async findAll(params: RequestEvent) {
    if (params?.period) {
      switch (params?.period) {
        case Periods.CurrentDay:
          const eventsCurrentDay = await this.findAllCurrentDay(params);
          return await this.findAllConvertData(eventsCurrentDay);
        case Periods.NextDay:
          const eventsNextDay = await this.findAllNextDay(params);
          return await this.findAllConvertData(eventsNextDay);
        case Periods.Week:
          const eventsWeek = await this.findAllWeek(params);
          return await this.findAllConvertData(eventsWeek);
        case Periods.Weekend:
          const eventsWeekend = await this.findAllWeekEnd(params);
          return await this.findAllConvertData(eventsWeekend);
        case Periods.Month:
          const eventsMonth = await this.findAllMonth(params);
          return await this.findAllConvertData(eventsMonth);
      }
    }

    const events = await this.EventRepository.find({
      where: {
        direction: params?.direction && params.direction,
        title: params?.title && ILike(`%${params.title}%`),
        desc: params?.desc && ILike(`%${params.desc}%`),
        tags: { tagsId: params?.tagId && params.tagId },
        cityId: params?.cityId && params.cityId,
      },
      relations: {
        info: true,
        visitors: {
          user: true,
        },
      },
      take: params?.take && params?.take,
      skip: params?.skip && params?.skip,
    });

    return await this.findAllConvertData(events);
  }

  private async findAllCurrentDay(params: RequestEvent) {
    const CurrentDay = new Date().toISOString().substring(0, 10);
    return await this.EventRepository.find({
      where: {
        direction: params?.direction && params.direction,
        title: params?.title && ILike(`%${params.title}%`),
        desc: params?.desc && ILike(`%${params.desc}%`),
        tags: { tagsId: params?.tagId && params.tagId },
        cityId: params?.cityId && params.cityId,
        existTimeStart: MoreThanOrEqual(new Date(CurrentDay)),
        existTimeEnd: MoreThan(new Date(CurrentDay)),
      },
      relations: {
        visitors: {
          user: true,
        },
      },
      take: params?.take && params?.take,
      skip: params?.skip && params?.skip,
      order: {
        existTimeStart: 'ASC',
      },
    });
  }

  private async findAllNextDay(params: RequestEvent) {
    const nextDay = add(new Date(), { days: 1 });
    return await this.EventRepository.find({
      where: {
        direction: params?.direction && params.direction,
        title: params?.title && ILike(`%${params.title}%`),
        desc: params?.desc && ILike(`%${params.desc}%`),
        tags: { tagsId: params?.tagId && params.tagId },
        cityId: params?.cityId && params.cityId,
        existTimeStart: MoreThanOrEqual(new Date(nextDay)),
        existTimeEnd: MoreThan(new Date(nextDay)),
      },
      relations: {
        visitors: {
          user: true,
        },
      },
      take: params?.take && params?.take,
      skip: params?.skip && params?.skip,
      order: {
        existTimeStart: 'ASC',
      },
    });
  }

  private async findAllWeek(params: RequestEvent) {
    const { monday, sunday } = getStartAndEndWeek();

    return await this.EventRepository.find({
      where: {
        direction: params?.direction && params.direction,
        title: params?.title && ILike(`%${params.title}%`),
        desc: params?.desc && ILike(`%${params.desc}%`),
        tags: { tagsId: params?.tagId && params.tagId },
        cityId: params?.cityId && params.cityId,
        existTimeStart: Between(new Date(monday), new Date(sunday)),
        existTimeEnd: MoreThan(new Date()),
      },
      relations: {
        visitors: {
          user: true,
        },
      },
      take: params?.take && params?.take,
      skip: params?.skip && params?.skip,
      order: {
        existTimeStart: 'ASC',
      },
    });
  }

  private async findAllWeekEnd(params: RequestEvent) {
    const { saturdey, sunday } = getWeekEnd();

    return await this.EventRepository.find({
      where: {
        direction: params?.direction && params.direction,
        title: params?.title && ILike(`%${params.title}%`),
        desc: params?.desc && ILike(`%${params.desc}%`),
        tags: { tagsId: params?.tagId && params.tagId },
        cityId: params?.cityId && params.cityId,
        existTimeStart: Between(new Date(saturdey), new Date(sunday)),
        existTimeEnd: MoreThan(new Date(saturdey)),
      },
      relations: {
        visitors: {
          user: true,
        },
      },
      take: params?.take && params?.take,
      skip: params?.skip && params?.skip,
      order: {
        existTimeStart: 'ASC',
      },
    });
  }

  private async findAllMonth(params: RequestEvent) {
    const { startMonth, endMonth } = getStartAndEndMonth();

    return await this.EventRepository.find({
      where: {
        direction: params?.direction && params.direction,
        title: params?.title && ILike(`%${params.title}%`),
        desc: params?.desc && ILike(`%${params.desc}%`),
        tags: { tagsId: params?.tagId && params.tagId },
        cityId: params?.cityId && params.cityId,
        existTimeStart: Between(new Date(startMonth), new Date(endMonth)),
        existTimeEnd: MoreThan(new Date(startMonth)),
      },
      relations: {
        visitors: {
          user: true,
        },
      },
      take: params?.take && params?.take,
      skip: params?.skip && params?.skip,
      order: {
        existTimeStart: 'ASC',
      },
    });
  }

  async findAllUserEvents(id: number) {
    return await this.EventRepository.find({
      where: {
        userId: id,
      },
      relations: {
        images: true,
        info: true,
        tags: { tags: true },
        costOption: { costOption: true },
      },
    });
  }

  async findOne(id: number) {
    const event = await this.EventRepository.findOne({
      where: { id },
      relations: {
        images: true,
        info: true,
        tags: { tags: true },
        costOption: { costOption: true },
        visitors: {
          user: true,
        },
        place: true,
      },
    });

    return await this.findOneConvertData(event);
  }

  // TODO добавить выборку по описанию, направлению и названию тега
  async findAllDashboard(params: RequestDashboard) {
    const date =
      params?.date && new Date(params?.date).toISOString().substring(0, 10);
    return await this.EventRepository.find({
      where: {
        title: params?.title && ILike(`%${params?.title}%`),
        existTimeStart:
          params?.date && Raw((alias) => `${alias} = :date`, { date }),
      },
      take: params?.take && params?.take,
      skip: params?.skip && params?.skip,
      order: {
        id: 'DESC',
      },
    });
  }

  async findAllID() {
    return await this.EventRepository.find({
      select: ['id'],
    });
  }

  async findOneDashboard(id: number) {
    return await this.EventRepository.findOne({
      where: { id },
      relations: {
        images: true,
        info: true,
        tags: { tags: true },
        costOption: { costOption: true },
      },
    });
  }

  async update(id: number, updateEventInput: UpdateEventInput) {
    await this.EventRepository.update({ id }, { ...updateEventInput });
  }

  async updateViews(id: number) {
    const event = await this.EventRepository.findOneBy({ id });
    return await this.EventRepository.update(
      { id },
      { views: event.views + 1 },
    );
  }

  async boostViews(id: number, views: number) {
    const event = await this.EventRepository.findOneBy({ id });
    return await this.EventRepository.update(
      { id },
      { views: event.views + views },
    );
  }

  async publish(id: number) {
    return await this.EventRepository.update({ id }, { publish: true });
  }

  async remove(id: number) {
    const isExist = await this.EventRepository.findOneBy({ id });

    if (!isExist)
      return { message: `событие с id: ${id} не найдено`, status: 'error' };

    if (isExist) {
      await this.EventRepository.delete({ id });
      const isRemove = await this.EventRepository.findOneBy({ id });
      if (!isRemove) {
        return {
          id,
          message: `событие с id: ${id} успешно удалёно`,
          status: 'success',
        };
      } else {
        return { message: `событие с id: ${id} не удалёно`, status: 'error' };
      }
    }
  }

  private async findAllConvertData(eventsDefault: EventEntity[]) {
    const events = [];

    for (let i = 0; i < eventsDefault.length; i++) {
      const event: EventEntity = eventsDefault[i];
      const eventInfo = await event.info;
      const eventImages = await event.images;
      const eventTags = await event.tags;
      const eventCostOption = await event.costOption;
      const eventVisitors = await event.visitors;
      const eventPlace = await event.place;
      const convertEvent = {};

      for (const key in event) {
        const visitors = [];
        if (
          (await event[key]) !== eventInfo &&
          (await event[key]) !== eventImages &&
          (await event[key]) !== eventTags &&
          (await event[key]) !== eventCostOption &&
          (await event[key]) !== eventVisitors &&
          (await event[key]) !== eventPlace
        ) {
          convertEvent[key] = event[key];
        }

        if (eventPlace) convertEvent['place'] = eventPlace.title;

        convertEvent['adress'] = eventInfo.adress;

        eventVisitors.forEach((element) => visitors.push(element.user.name));

        convertEvent['visitors'] = visitors;
        convertEvent['visitorsCount'] = (await event['visitors']).length;
      }

      events.push(convertEvent);
    }

    return events;
  }

  private async findOneConvertData(eventDefault: EventEntity) {
    const event = {};
    const info = {};
    const images = [];
    const tags = [];
    const costOptions = [];
    const visitors = [];

    console.log(await getRating(eventDefault.id));

    const eventInfo = await eventDefault.info;
    const eventImages = await eventDefault.images;
    const eventTags = await eventDefault.tags;
    const eventCostOption = await eventDefault.costOption;
    const eventVisitors = await eventDefault.visitors;
    const eventPlace = await eventDefault.place;
    const eventRating = await eventDefault.rating;

    for (const key in eventDefault) {
      if (
        (await eventDefault[key]) !== eventInfo &&
        (await eventDefault[key]) !== eventImages &&
        (await eventDefault[key]) !== eventTags &&
        (await eventDefault[key]) !== eventCostOption &&
        (await eventDefault[key]) !== eventVisitors &&
        (await eventDefault[key]) !== eventPlace &&
        (await eventDefault[key]) !== eventRating
      ) {
        event[key] = eventDefault[key];
      }
    }

    if (eventPlace) event['place'] = eventPlace.title;

    // const eventRatingStars: number = eventRating
    //   .map(({ stars }) => stars)
    //   .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    // const eventRatingUsers: number[] = eventRating.map(({ userId }) => userId);
    // const rating = Math.floor(eventRatingStars / eventRatingUsers.length);

    for (const key in eventInfo) {
      info[key] = eventInfo[key];
    }

    eventImages.forEach((element) => {
      images.push(element.path);
    });

    eventTags.forEach((element) => {
      const tag = { id: element.tags.id, name: element.tags.name };
      tags.push(tag);
    });

    eventCostOption.forEach((element) => {
      const costOption = {
        name: element.costOption.name,
        price: element.price,
      };
      costOptions.push(costOption);
    });

    eventVisitors.forEach((element) => visitors.push(element.user.name));

    return {
      ...event,
      info,
      images,
      tags,
      costOptions,
      visitors,
      visitorsCount: eventVisitors.length,
    };
  }

  // TODO написать запрос для динамического виджета
}
