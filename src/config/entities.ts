import { CityEntity } from 'src/cities/entities/city.entity';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { CostOptionEntity } from 'src/cost-options/entities/cost-option.entity';
import { EventEntity } from 'src/event/entities/event.entity';
import { EventPlaceCostOptionEntity } from 'src/event_place_cost_options/entities/event_place_cost_option.entity';
import { EventPlaceTagEntity } from 'src/event_place_tags/entities/event_place_tag.entity';
import { ImageEntity } from 'src/images/entities/image.entity';
import { InfoEntity } from 'src/info/entities/info.entity';
import { PlaceEntity } from 'src/place/entities/place.entity';
import { RatingEntity } from 'src/rating/entities/rating.entity';
import { RoleEntity } from 'src/role/entities/role.entity';
import { ShortRatingEntity } from 'src/short-rating/entities/short-rating.entity';
import { ShortEntity } from 'src/short/entities/short.entity';
import { StatisticEntity } from 'src/statistics/entities/statistic.entity';
import { TagEntity } from 'src/tag/entities/tag.entity';
import { TokenEntity } from 'src/tokens/entities/token.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { VisitorEntity } from 'src/visitor/entities/visitor.entity';
import { WidgetEntity } from 'src/widget/entities/widget.entity';
import { WidgetBodyEntity } from 'src/widget_body/entities/widget_body.entity';

export const entities = [
  CostOptionEntity,
  EventEntity,
  EventPlaceCostOptionEntity,
  EventPlaceTagEntity,
  ImageEntity,
  InfoEntity,
  PlaceEntity,
  RoleEntity,
  TagEntity,
  TokenEntity,
  UserEntity,
  CityEntity,
  WidgetEntity,
  WidgetBodyEntity,
  RatingEntity,
  ShortEntity,
  ShortRatingEntity,
  CommentEntity,
  StatisticEntity,
  VisitorEntity,
];
