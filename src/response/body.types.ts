import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class Body {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  preview: string;
}
