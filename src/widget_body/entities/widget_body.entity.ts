import { ObjectType, Field, Int } from '@nestjs/graphql';
import { EventEntity } from 'src/event/entities/event.entity';
import { PlaceEntity } from 'src/place/entities/place.entity';
import { WidgetEntity } from 'src/widget/entities/widget.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('widget_body')
export class WidgetBodyEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  widgetId: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  eventId?: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  placeId?: number;

  @Field(() => EventEntity)
  @ManyToOne(() => EventEntity, (event) => event.body)
  event: EventEntity;

  @Field(() => PlaceEntity)
  @ManyToOne(() => PlaceEntity, (place) => place.body)
  place: PlaceEntity;

  @Field(() => WidgetEntity)
  @ManyToOne(() => WidgetEntity, (widget) => widget.body)
  widget: WidgetEntity;
}
