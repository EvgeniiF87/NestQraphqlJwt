import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RatingService } from './rating.service';
import { RatingEntity } from './entities/rating.entity';
import { CreateRatingInput } from './dto/create-rating.input';
import { UpdateRatingInput } from './dto/update-rating.input';

@Resolver(() => RatingEntity)
export class RatingResolver {
  constructor(private readonly ratingService: RatingService) {}

  @Mutation(() => RatingEntity)
  createRating(
    @Args('createRatingInput') createRatingInput: CreateRatingInput,
  ) {
    return this.ratingService.create(createRatingInput);
  }

  @Query(() => [RatingEntity], { name: 'rating' })
  findAll() {
    return this.ratingService.findAll();
  }

  @Query(() => RatingEntity, { name: 'rating' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ratingService.findOne(id);
  }

  @Mutation(() => RatingEntity)
  updateRating(
    @Args('updateRatingInput') updateRatingInput: UpdateRatingInput,
  ) {
    return this.ratingService.update(updateRatingInput.id, updateRatingInput);
  }

  @Mutation(() => RatingEntity)
  removeRating(@Args('id', { type: () => Int }) id: number) {
    return this.ratingService.remove(id);
  }
}
