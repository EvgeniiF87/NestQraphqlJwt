import { CreateShortInput } from './create-short.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateShortInput extends PartialType(CreateShortInput) {
  @Field(() => Int)
  id: number;
}
