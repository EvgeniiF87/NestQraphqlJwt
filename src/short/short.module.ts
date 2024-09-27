import { Module } from '@nestjs/common';
import { ShortService } from './short.service';
import { ShortResolver } from './short.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortEntity } from './entities/short.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShortEntity])],
  providers: [ShortResolver, ShortService],
})
export class ShortModule {}
