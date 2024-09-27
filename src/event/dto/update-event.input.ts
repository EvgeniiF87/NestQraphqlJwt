import { CreateEventInput } from './create-event.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateEventInput extends PartialType(CreateEventInput) {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  like: number;

  @Field(() => Int, { nullable: true })
  dislike: number;
}
