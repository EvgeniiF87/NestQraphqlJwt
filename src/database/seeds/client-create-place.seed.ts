import { EventPlaceCostOptionEntity } from 'src/event_place_cost_options/entities/event_place_cost_option.entity';
import { EventPlaceTagEntity } from 'src/event_place_tags/entities/event_place_tag.entity';
import { RandomsID, randomNumber, randomPrice } from 'src/helpers/seed-helper';
import { ImageEntity } from 'src/images/entities/image.entity';
import { InfoEntity } from 'src/info/entities/info.entity';
import { PlaceDirections } from 'src/place/directions';
import { PlaceEntity } from 'src/place/entities/place.entity';
import { Roles } from 'src/role/role-types';
import { DataSource } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateClientPlace implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<any> {
    const clientRoleID = await dataSource.query(
      `SELECT id FROM roles WHERE roles.name = '${Roles.Client}'`,
    );
    const clients: [] = await dataSource.query(
      `SELECT id FROM users WHERE users."roleId" = ${clientRoleID[0].id}`,
    );
    const tagsID = await dataSource.query('SELECT id FROM tags');
    const costOptionsID = await dataSource.query('SELECT id FROM cost_options');
    const randomTagsID = await RandomsID(tagsID);
    const randomCostOptionsID = await RandomsID(costOptionsID, {
      count: 3,
    });

    const clientsID = clients.map(({ id }) => id);
    const randomClientsID = await RandomsID(clientsID, { count: 3 });

    const bar1 = await factory(PlaceEntity)().create({
      title: 'Бар "Угловой"',
      userId: randomClientsID[0],
      cityId: 33,
      direction: PlaceDirections.Restaurants,
    });

    const bar2 = await factory(PlaceEntity)().create({
      title: 'Бар "Тапки"',
      userId: randomClientsID[1],
      cityId: 33,
      direction: PlaceDirections.Restaurants,
    });

    const bar3 = await factory(PlaceEntity)().create({
      title: 'Бар "Весёлый"',
      userId: randomClientsID[2],
      cityId: 33,
      direction: PlaceDirections.Restaurants,
    });

    const bars = [bar1.id, bar2.id, bar3.id];

    for (let i = 0; i < bars.length; i++) {
      const placeId = bars[i];
      await factory(InfoEntity)().create({ placeId });
      await factory(ImageEntity)().createMany(randomNumber(), {
        placeId,
      });

      for (let t = 0; t < randomTagsID.length; t++) {
        const tagsId = randomTagsID[t];
        await factory(EventPlaceTagEntity)().create({
          placeId,
          tagsId,
        });
      }

      for (let cost = 0; cost < randomCostOptionsID.length; cost++) {
        const costOptionId = randomCostOptionsID[cost];
        await factory(EventPlaceCostOptionEntity)().create({
          placeId,
          costOptionId,
          price: String(randomPrice()),
        });
      }
    }
  }
}
