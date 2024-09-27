import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { EventModule } from './event/event.module';
import { TagModule } from './tag/tag.module';
import { CostOptionsModule } from './cost-options/cost-options.module';
import { ImagesModule } from './images/images.module';
import { PlaceModule } from './place/place.module';
import { InfoModule } from './info/info.module';
import { EventPlaceTagsModule } from './event_place_tags/event_place_tags.module';
import { EventPlaceCostOptionsModule } from './event_place_cost_options/event_place_cost_options.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { ormconfig } from './config/ormconfig';
import { GraphqlConfig } from './config/graphqlconfig';
import { join } from 'path';
import { CitiesModule } from './cities/cities.module';
import { WidgetModule } from './widget/widget.module';
import { WidgetBodyModule } from './widget_body/widget_body.module';
import { RatingModule } from './rating/rating.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { ShortModule } from './short/short.module';
import { ShortRatingModule } from './short-rating/short-rating.module';
import { StatisticsModule } from './statistics/statistics.module';
import { CommentsModule } from './comments/comments.module';
import { VisitorModule } from './visitor/visitor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env'),
    }),
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot(GraphqlConfig),
    TypeOrmModule.forRootAsync(ormconfig),
    UserModule,
    EventModule,
    TagModule,
    CostOptionsModule,
    ImagesModule,
    PlaceModule,
    InfoModule,
    EventPlaceTagsModule,
    EventPlaceCostOptionsModule,
    RoleModule,
    AuthModule,
    TokensModule,
    CitiesModule,
    WidgetModule,
    WidgetBodyModule,
    RatingModule,
    // TasksModule,
    ShortModule,
    ShortRatingModule,
    StatisticsModule,
    CommentsModule,
    VisitorModule,
  ],
})
export class AppModule {}
