import { CreateShortRatingInput } from './create-short-rating.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateShortRatingInput extends PartialType(CreateShortRatingInput) {
  @Field(() => Int)
  id: number;
}
