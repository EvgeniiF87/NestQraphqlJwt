import { Factory, Seeder } from 'typeorm-seeding';
import { DataSource } from 'typeorm';
import { Roles } from 'src/role/role-types';
import { RandomsID } from 'src/helpers/seed-helper';

export default class UpdateEvents implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<any> {
    const placeClients = await dataSource.query(`
      SELECT p.id, i.adress FROM places AS "p"
      LEFT JOIN users AS "u" ON "p"."userId" = "u".id 
      LEFT JOIN roles AS "r" ON "u"."roleId" = "r".id
      LEFT JOIN info AS "i" ON "i"."placeId" = "p".id
      WHERE "r"."name" = '${Roles.Client}'
   `);
    const events: [] = await dataSource.query(`SELECT id FROM events`);
    const eventsID = events.map(({ id }) => id);

    for (let i = 0; i < placeClients.length; i++) {
      const placeId = placeClients[i]['id'];
      const adress = placeClients[i]['adress'];
      const randomEventsID = await RandomsID(eventsID, { count: 3 });

      for (let e = 0; e < randomEventsID.length; e++) {
        const eventId = randomEventsID[e];
        await dataSource.query(
          `UPDATE events SET "placeId" = ${placeId} WHERE id = ${eventId}`,
        );
        await dataSource.query(
          `UPDATE info SET "adress" = '${adress}' WHERE info."eventId" = ${eventId}`,
        );
      }
    }
  }
}
