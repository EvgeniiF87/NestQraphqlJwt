import { RatingEntity } from 'src/rating/entities/rating.entity';
import { define } from 'typeorm-seeding';

define(RatingEntity, () => {
  const rating = new RatingEntity();
  return rating;
});
