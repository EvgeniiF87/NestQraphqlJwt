import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Widgets } from 'src/widget/types/widget-types';
import Body from './body.types';

@ObjectType()
export default class WidgetResponse {
  @Field(() => Int)
  id: number;

  @Field(() => Widgets)
  type: string;

  @Field()
  active: boolean;

  @Field(() => Int)
  sort: number;

  @Field({ nullable: true })
  title?: string;

  @Field(() => [Body])
  body: Body[];
}
