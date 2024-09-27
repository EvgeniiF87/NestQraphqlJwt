import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ShortRatingService } from './short-rating.service';
import { ShortRatingEntity } from './entities/short-rating.entity';
import { CreateShortRatingInput } from './dto/create-short-rating.input';
import { UpdateShortRatingInput } from './dto/update-short-rating.input';

@Resolver(() => ShortRatingEntity)
export class ShortRatingResolver {
  constructor(private readonly shortRatingService: ShortRatingService) {}

  @Mutation(() => ShortRatingEntity)
  createShortRating(
    @Args('createShortRatingInput')
    createShortRatingInput: CreateShortRatingInput,
  ) {
    return this.shortRatingService.create(createShortRatingInput);
  }

  @Query(() => [ShortRatingEntity], { name: 'shortRating' })
  findAll() {
    return this.shortRatingService.findAll();
  }

  @Query(() => ShortRatingEntity, { name: 'shortRating' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.shortRatingService.findOne(id);
  }

  @Mutation(() => ShortRatingEntity)
  updateShortRating(
    @Args('updateShortRatingInput')
    updateShortRatingInput: UpdateShortRatingInput,
  ) {
    return this.shortRatingService.update(
      updateShortRatingInput.id,
      updateShortRatingInput,
    );
  }

  @Mutation(() => ShortRatingEntity)
  removeShortRating(@Args('id', { type: () => Int }) id: number) {
    return this.shortRatingService.remove(id);
  }
}
