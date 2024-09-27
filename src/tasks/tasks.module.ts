import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { EventModule } from 'src/event/event.module';
import { PlaceModule } from 'src/place/place.module';

@Module({
  imports: [EventModule, PlaceModule],
  providers: [TasksService],
})
export class TasksModule {}
