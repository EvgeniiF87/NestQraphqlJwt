import { Factory, Seeder } from 'typeorm-seeding';
import { DataSource } from 'typeorm';
import { RandomsID } from 'src/helpers/seed-helper';
import { Roles } from 'src/role/role-types';
import { VisitorEntity } from 'src/visitor/entities/visitor.entity';

export default class CreateVisitors implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<any> {
    const userRoleID = await dataSource.query(
      `SELECT id FROM roles WHERE roles.name = '${Roles.User}'`,
    );
    const users: [] = await dataSource.query(
      `SELECT id FROM users WHERE users."roleId" = ${userRoleID[0].id}`,
    );
    const events: [] = await dataSource.query(
      `SELECT id, "existTimeStart" FROM events`,
    );

    const usersID = users.map(({ id }) => id);

    for (let i = 0; i < events.length; i++) {
      const eventId = events[i]['id'];
      const existTimeStart = events[i]['existTimeStart'];
      const randomUsersID = await RandomsID(usersID, { min: 15, max: 30 });

      for (let u = 0; u < randomUsersID.length; u++) {
        const userId = randomUsersID[u];
        await factory(VisitorEntity)().create({
          eventId,
          userId,
          date: existTimeStart,
        });
      }
    }
  }
}
