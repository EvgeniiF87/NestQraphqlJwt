import { Module } from '@nestjs/common';
import { WidgetBodyService } from './widget_body.service';
import { WidgetBodyResolver } from './widget_body.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WidgetBodyEntity } from './entities/widget_body.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WidgetBodyEntity])],
  providers: [WidgetBodyResolver, WidgetBodyService],
})
export class WidgetBodyModule {}
