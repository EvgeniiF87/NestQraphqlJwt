import { Factory, Seeder } from 'typeorm-seeding';
import { DataSource } from 'typeorm';
import { RandomsID, randomNumber } from 'src/helpers/seed-helper';
import { Roles } from 'src/role/role-types';
import { RatingEntity } from 'src/rating/entities/rating.entity';

export default class CreateRatings implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<any> {
    const userRoleID = await dataSource.query(
      `SELECT id FROM roles WHERE roles.name = '${Roles.User}'`,
    );
    const users: [] = await dataSource.query(
      `SELECT id FROM users WHERE users."roleId" = ${userRoleID[0].id}`,
    );
    const events: [] = await dataSource.query(`SELECT id FROM events`);

    const usersID = users.map(({ id }) => id);
    const eventsID = events.map(({ id }) => id);

    for (let e = 0; e < eventsID.length; e++) {
      const eventId = eventsID[e];
      const randomUsersID = await RandomsID(usersID, { min: 15, max: 30 });

      for (let u = 0; u < randomUsersID.length; u++) {
        const userId = randomUsersID[u];
        const stars = randomNumber(1, 5);

        await factory(RatingEntity)().create({
          eventId,
          userId,
          stars,
        });
      }
    }
  }
}
