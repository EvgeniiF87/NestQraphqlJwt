import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DefaultFieldsEntity } from 'src/default-fields-entity';

@ObjectType({ description: 'получить все события' })
export default class EventsResponse extends DefaultFieldsEntity {
  @Field()
  recommendation: boolean;

  @Field()
  categry: string;

  @Field()
  direction: string;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  cityId: number;

  @Field(() => [String], { nullable: true })
  visitors: [string];

  @Field(() => Int, { nullable: true })
  visitorsCount: number;

  @Field({ nullable: true })
  place: string;

  @Field()
  adress: string;
}
