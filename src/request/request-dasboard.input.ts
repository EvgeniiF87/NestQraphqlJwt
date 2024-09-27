import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class RequestDashboard {
  @Field({ nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => Date, { nullable: true })
  date?: Date;
}
