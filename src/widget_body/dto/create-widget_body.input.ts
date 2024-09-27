import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateWidgetBodyInput {
  @Field(() => Int)
  widgetId: number;

  @Field(() => Int, { nullable: true })
  eventId?: number;

  @Field(() => Int, { nullable: true })
  placeId?: number;
}
