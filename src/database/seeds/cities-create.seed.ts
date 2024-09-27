import { CityEntity } from 'src/cities/entities/city.entity';
import { Factory, Seeder } from 'typeorm-seeding';
import { RussianCities2 } from '../fake-data/russian-cities-v2';

export default class CreateCities implements Seeder {
  public async run(factory: Factory): Promise<any> {
    for (let i = 0; i < RussianCities2.length; i++) {
      const item = RussianCities2[i];
      const region = item.name;
      const cities = item.cities;

      for (let c = 0; c < cities.length; c++) {
        const location = cities[c].coordinates.split(',');
        await factory(CityEntity)().create({
          region,
          name: cities[c].name,
          time_zons: cities[c].time_zons,
          utc: cities[c].utc,
          latitude: location[0],
          longitude: location[1],
        });
      }
    }
  }
}
