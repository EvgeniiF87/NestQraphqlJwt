import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateShortRatingInput {
  @Field(() => Int)
  @IsInt({ message: 'поле должно быть целым числом' })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  shortId: number;

  @Field(() => Int)
  @IsInt({ message: 'поле должно быть целым числом' })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  like: number;

  @Field(() => Int)
  @IsInt({ message: 'поле должно быть целым числом' })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  dislike: number;
}
