import { InputType, Int, Field } from '@nestjs/graphql';
import { Widgets } from '../types/widget-types';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateWidgetInput {
  @Field(() => Widgets)
  @IsEnum(Widgets, { message: 'поле должно соответствовать типу Widgets' })
  @IsNotEmpty({ message: 'поле не должно ыть пусты' })
  type: Widgets;

  @Field({ defaultValue: true })
  @IsBoolean({ message: 'поле должно быть блевым значением' })
  @IsNotEmpty({ message: 'поле не должно ыть пусты' })
  active: boolean;

  @Field(() => Int)
  @IsInt({ message: 'поле должно быть целым числом' })
  @IsNotEmpty({ message: 'поле не должно ыть пусты' })
  sort: number;

  @Field({ nullable: true })
  title?: string;
}
