import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RequestTags {
  @Field({ nullable: true })
  name: string;
}
