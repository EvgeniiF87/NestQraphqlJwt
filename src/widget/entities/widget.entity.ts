import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Widgets } from '../types/widget-types';
import { WidgetBodyEntity } from 'src/widget_body/entities/widget_body.entity';

@ObjectType()
@Entity('widgets')
export class WidgetEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Widgets)
  @Column({ type: 'enum', enum: Widgets })
  type: string;

  @Field({ defaultValue: true })
  @Column({ default: true })
  active: boolean;

  @Field(() => Int)
  @Column()
  sort: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  title?: string;

  @Field(() => [WidgetBodyEntity], { nullable: true })
  @OneToMany(() => WidgetBodyEntity, (wBady) => wBady.widget)
  body?: WidgetBodyEntity[];
}
