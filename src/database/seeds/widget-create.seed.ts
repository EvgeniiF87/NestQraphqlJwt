import { Factory, Seeder } from 'typeorm-seeding';
import { DataSource } from 'typeorm';
import { WidgetEntity } from 'src/widget/entities/widget.entity';
import { RandomsID } from 'src/helpers/seed-helper';
import { Widgets } from 'src/widget/types/widget-types';
import { WidgetBodyEntity } from 'src/widget_body/entities/widget_body.entity';

export default class CreateWidget implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<any> {
    const events: [] = await dataSource.query(`SELECT id FROM events`);
    const places: [] = await dataSource.query(`SELECT id FROM places`);

    const eventsID = events.map(({ id }) => id);
    const placesID = places.map(({ id }) => id);

    await factory(WidgetEntity)().create({
      type: Widgets.Map,
      active: true,
      sort: 1,
    });

    const widget1 = await factory(WidgetEntity)().create({
      type: Widgets.Static_collections,
      active: true,
      sort: 2,
      title: 'Подборка памятников',
    });

    const widgetId1 = widget1.id;

    for (let i = 0; i < 8; i++) {
      const placeId = await RandomsID(placesID, { count: 1 });

      await factory(WidgetBodyEntity)().create({
        widgetId: widgetId1,
        placeId: placeId[0],
      });
    }

    await factory(WidgetEntity)().create({
      type: Widgets.Create_place,
      active: true,
      sort: 3,
    });

    await factory(WidgetEntity)().create({
      type: Widgets.Go,
      active: true,
      sort: 4,
    });

    const widget2 = await factory(WidgetEntity)().create({
      type: Widgets.Static_collections,
      active: true,
      sort: 5,
      title: 'Подборка выставок',
    });

    const widgetId2 = widget2.id;

    for (let i = 0; i < 10; i++) {
      const eventId = await RandomsID(eventsID, { count: 1 });

      await factory(WidgetBodyEntity)().create({
        widgetId: widgetId2,
        eventId: eventId[0],
      });
    }

    await factory(WidgetEntity)().create({
      type: Widgets.Create_event,
      active: true,
      sort: 6,
    });
  }
}
