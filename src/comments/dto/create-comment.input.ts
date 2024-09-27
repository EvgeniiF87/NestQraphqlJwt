import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field(() => Int)
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  @IsInt({ message: 'поле должно быть целым числом' })
  userId: number;

  @Field(() => Int)
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  @IsInt({ message: 'поле должно быть целым числом' })
  shortId: number;

  @Field(() => Int)
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  @IsInt({ message: 'поле должно быть целым числом' })
  eventId: number;

  @Field(() => Int)
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  @IsInt({ message: 'поле должно быть целым числом' })
  placeId: number;

  @Field()
  @IsString({ message: 'поле должно быть строкой' })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  @Min(5, { message: 'Не менее 5-ти символов' })
  comment: string;
}
