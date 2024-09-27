import { Module } from '@nestjs/common';
import { WidgetService } from './widget.service';
import { WidgetResolver } from './widget.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WidgetEntity } from './entities/widget.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WidgetEntity])],
  providers: [WidgetResolver, WidgetService],
})
export class WidgetModule {}
