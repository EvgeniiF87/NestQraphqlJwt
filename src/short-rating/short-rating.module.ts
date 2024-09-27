import { Module } from '@nestjs/common';
import { ShortRatingService } from './short-rating.service';
import { ShortRatingResolver } from './short-rating.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortRatingEntity } from './entities/short-rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShortRatingEntity])],
  providers: [ShortRatingResolver, ShortRatingService],
})
export class ShortRatingModule {}
