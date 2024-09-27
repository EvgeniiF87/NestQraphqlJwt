import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { CitiesService } from './cities.service';
import { CityEntity } from './entities/city.entity';
import { RequestCities } from './dto/request-cities.input';

@Resolver(() => CityEntity)
export class CitiesResolver {
  constructor(private readonly citiesService: CitiesService) {}

  @Query(() => [CityEntity], { name: 'cities' })
  findAll(@Args('params', { nullable: true }) params?: RequestCities) {
    return this.citiesService.findAll(params);
  }

  @Query(() => [CityEntity], { name: 'cityEventsAndPlaces' })
  findAllEventsAndPlaces(@Args('id', { type: () => Int }) id: number) {
    return this.citiesService.findAllEventsAndPlaces(id);
  }

  @Query(() => CityEntity, { name: 'city' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.citiesService.findOne(id);
  }
}
