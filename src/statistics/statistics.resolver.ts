import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StatisticsService } from './statistics.service';
import { StatisticEntity } from './entities/statistic.entity';
import { CreateStatisticInput } from './dto/create-statistic.input';

@Resolver(() => StatisticEntity)
export class StatisticsResolver {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Mutation(() => StatisticEntity)
  createStatistic(
    @Args('createStatisticInput') createStatisticInput: CreateStatisticInput,
  ) {
    return this.statisticsService.create(createStatisticInput);
  }

  @Query(() => StatisticEntity, { name: 'statistic' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.statisticsService.findOne(id);
  }
}