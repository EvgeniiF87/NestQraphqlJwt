import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsResolver } from './statistics.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticEntity } from './entities/statistic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StatisticEntity])],
  providers: [StatisticsResolver, StatisticsService],
})
export class StatisticsModule {}
