import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsInt, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateStatisticInput {
  @Field()
  day: string;

  @Field(() => Int)
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  @IsInt({ message: 'поле должно быть целым числом' })
  views: number;

  @Field(() => Date)
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  @IsDate({ message: 'поле должно быть датой в формате ГОД:МЕСЯЦ:ДЕНЬ' })
  currentDay: Date;

  @Field(() => Int)
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  @IsInt({ message: 'поле должно быть целым числом' })
  eventId: number;

  @Field(() => Int)
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  @IsInt({ message: 'поле должно быть целым числом' })
  userId: number;
}
