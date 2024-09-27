import { EventPlaceTagEntity } from 'src/event_place_tags/entities/event_place_tag.entity';
import { RandomsID, randomNumber } from 'src/helpers/seed-helper';
import { ImageEntity } from 'src/images/entities/image.entity';
import { InfoEntity } from 'src/info/entities/info.entity';
import { PlaceDirections } from 'src/place/directions';
import { PlaceEntity } from 'src/place/entities/place.entity';
import { Roles } from 'src/role/role-types';
import { DataSource } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

const UsersID = async (dataSource: DataSource, count = 5) => {
  const userRoleID = await dataSource.query(
    `SELECT id FROM roles WHERE roles.name = '${Roles.User}'`,
  );
  const users: [] = await dataSource.query(
    `SELECT id FROM users WHERE users."roleId" = ${userRoleID[0].id}`,
  );

  const IDs = users.map(({ id }) => id);

  const randomUsersID = await RandomsID(IDs, { count });

  return randomUsersID;
};

const placeDirections = Object.keys(PlaceDirections).map(
  (direction) => direction,
);

export default class CreateUsersPlaces implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<any> {
    const citiesID = await dataSource.query('SELECT id FROM cities');
    const tagsID = await dataSource.query('SELECT id FROM tags');
    const usersID = await UsersID(dataSource, 10);

    for (let u = 0; u < usersID.length; u++) {
      const userId = usersID[u];
      const cityId = await RandomsID(citiesID, { count: 1 });

      for (let i = 0; i < randomNumber(3, 5); i++) {
        const randomPlaceDirections = await RandomsID(placeDirections, {
          count: 1,
        });

        const place = await factory(PlaceEntity)().create({
          direction: PlaceDirections[randomPlaceDirections],
          userId,
          cityId: cityId[0].id,
        });

        const randomTagsID = await RandomsID(tagsID);

        await factory(InfoEntity)().create({ placeId: place.id });

        await factory(ImageEntity)().createMany(randomNumber(2, 3), {
          placeId: place.id,
        });

        for (let t = 0; t < randomTagsID.length; t++) {
          const tagsId = randomTagsID[t];
          await factory(EventPlaceTagEntity)().create({
            placeId: place.id,
            tagsId,
          });
        }
      }
    }
  }
}
