import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateShortInput {
  @Field()
  @IsString({ message: 'поле должно быть строкой' })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  title: string;

  @Field()
  @IsString({ message: 'поле должно быть строкой' })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  path: string;

  @Field(() => Int, { nullable: true })
  eventId?: number;

  @Field(() => Int, { nullable: true })
  placeId?: number;

  @Field(() => Int)
  @IsInt({ message: 'поле должно быть целым числом' })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  userId: number;
}
