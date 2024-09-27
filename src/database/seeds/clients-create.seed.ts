import { Roles } from 'src/role/role-types';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';

export default class CreateClients implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<any> {
    const clientRoleID = await dataSource.query(
      `SELECT id FROM roles WHERE roles.name = '${Roles.Client}'`,
    );

    for (let i = 0; i < 5; i++) {
      const name = faker.person.firstName();
      await factory(UserEntity)().create({
        name,
        email: faker.internet.email({ firstName: name }),
        password: await bcrypt.hash('123456789', 10),
        roleId: clientRoleID[0].id,
      });
    }
  }
}
