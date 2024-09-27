import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingResolver } from './rating.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingEntity } from './entities/rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RatingEntity])],
  providers: [RatingResolver, RatingService],
})
export class RatingModule {}
