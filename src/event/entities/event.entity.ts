import { ObjectType, Field, Int } from '@nestjs/graphql';
import { EventPlaceCostOptionEntity } from 'src/event_place_cost_options/entities/event_place_cost_option.entity';
import { EventPlaceTagEntity } from 'src/event_place_tags/entities/event_place_tag.entity';
import { ImageEntity } from 'src/images/entities/image.entity';
import { InfoEntity } from 'src/info/entities/info.entity';
import { EventDirections } from '../directions';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { DefaultFieldsEntity } from 'src/default-fields-entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { CityEntity } from 'src/cities/entities/city.entity';
import { WidgetBodyEntity } from 'src/widget_body/entities/widget_body.entity';
import { PlaceEntity } from 'src/place/entities/place.entity';
import { RatingEntity } from 'src/rating/entities/rating.entity';
import { ShortEntity } from 'src/short/entities/short.entity';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { VisitorEntity } from 'src/visitor/entities/visitor.entity';

@ObjectType()
@Entity('events')
export class EventEntity extends DefaultFieldsEntity {
  @Field({ defaultValue: false })
  @Column({ type: 'boolean', default: false })
  recommendation: boolean;

  @Field({ defaultValue: 'events' })
  @Column({ default: 'events' })
  categry: string;

  @Field(() => EventDirections)
  @Column({ type: 'enum', enum: EventDirections })
  direction: EventDirections;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.events)
  user: Promise<UserEntity>;

  @Field(() => Int)
  @Column()
  cityId: number;

  @Field(() => CityEntity)
  @ManyToOne(() => CityEntity, (city) => city.events)
  city: Promise<CityEntity>;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  placeId: number;

  @Field(() => PlaceEntity, { nullable: true })
  @ManyToOne(() => PlaceEntity, (place) => place.events)
  place?: Promise<PlaceEntity>;

  @Field(() => [ImageEntity])
  @OneToMany(() => ImageEntity, (image) => image.event, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  images: Promise<ImageEntity[]>;

  @Field(() => InfoEntity)
  @OneToOne(() => InfoEntity, (info) => info.event, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  info: Promise<InfoEntity>;

  @Field(() => [EventPlaceTagEntity])
  @OneToMany(() => EventPlaceTagEntity, (eventTag) => eventTag.event)
  tags: Promise<EventPlaceTagEntity[]>;

  @Field(() => [EventPlaceCostOptionEntity])
  @OneToMany(() => EventPlaceCostOptionEntity, (costOption) => costOption.event)
  costOption: Promise<EventPlaceCostOptionEntity[]>;

  @Field(() => [WidgetBodyEntity], { nullable: true })
  @OneToMany(() => WidgetBodyEntity, (wBady) => wBady.event)
  body?: Promise<WidgetBodyEntity[]>;

  @Field(() => [RatingEntity], { nullable: true })
  @OneToMany(() => RatingEntity, (rating) => rating.event)
  rating?: Promise<RatingEntity[]>;

  @Field(() => [ShortEntity], { nullable: true })
  @OneToMany(() => ShortEntity, (short) => short.event)
  shorts?: Promise<ShortEntity[]>;

  @Field(() => [CommentEntity], { nullable: true })
  @OneToMany(() => CommentEntity, (comment) => comment.event)
  comments?: Promise<CommentEntity[]>;

  @Field(() => [VisitorEntity], { nullable: true })
  @OneToMany(() => VisitorEntity, (visit) => visit.event)
  visitors?: Promise<VisitorEntity[]>;

  @Field(() => Date)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at: Date;
}
