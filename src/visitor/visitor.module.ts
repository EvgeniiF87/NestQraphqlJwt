import { Module } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { VisitorResolver } from './visitor.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitorEntity } from './entities/visitor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VisitorEntity])],
  providers: [VisitorResolver, VisitorService],
})
export class VisitorModule {}
