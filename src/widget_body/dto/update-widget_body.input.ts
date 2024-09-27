import { CreateWidgetBodyInput } from './create-widget_body.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateWidgetBodyInput extends PartialType(CreateWidgetBodyInput) {
  @Field(() => Int)
  id: number;
}
