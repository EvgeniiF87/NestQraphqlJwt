import { CreatePlaceInput } from './create-place.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePlaceInput extends PartialType(CreatePlaceInput) {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  like: number;

  @Field(() => Int, { nullable: true })
  dislike: number;
}
