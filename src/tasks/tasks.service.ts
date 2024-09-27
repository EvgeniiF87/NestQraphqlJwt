import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EventService } from 'src/event/event.service';
import { randomNumber } from 'src/helpers/seed-helper';
import { PlaceService } from 'src/place/place.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly eventService: EventService,
    private readonly placeService: PlaceService,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async boostViewsEvents() {
    const eventsID = await this.eventService.findAllID();
    const IDS = eventsID.map(({ id }) => id);

    for (let i = 0; i < IDS.length; i++) {
      const id = IDS[i];
      const views = randomNumber(50, 100);
      await this.eventService.boostViews(id, views);
    }

    console.log('Boost Views Events Success');
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async boostViewsPlaces() {
    const eventsID = await this.placeService.findAllID();
    const IDS = eventsID.map(({ id }) => id);

    for (let i = 0; i < IDS.length; i++) {
      const id = IDS[i];
      const views = randomNumber(50, 100);
      await this.placeService.boostViews(id, views);
    }

    console.log('Boost Views Places Success');
  }
}
