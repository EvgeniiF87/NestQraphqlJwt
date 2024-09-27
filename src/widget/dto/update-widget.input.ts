import { CreateWidgetInput } from './create-widget.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateWidgetInput extends PartialType(CreateWidgetInput) {
  @Field(() => Int)
  id: number;
}
