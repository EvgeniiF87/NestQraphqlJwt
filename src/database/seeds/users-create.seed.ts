import { Roles } from 'src/role/role-types';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<any> {
    const userRoleID = await dataSource.query(
      `SELECT id FROM roles WHERE roles.name = '${Roles.User}'`,
    );

    for (let i = 0; i < 30; i++) {
      const name = faker.person.firstName();
      await factory(UserEntity)().create({
        name,
        email: faker.internet.email({ firstName: name }),
        password: await bcrypt.hash('123456789', 10),
        roleId: userRoleID[0].id,
      });
    }
  }
}
