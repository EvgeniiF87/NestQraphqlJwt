import { ObjectType, Field, Int } from '@nestjs/graphql';
import { EventPlaceCostOptionEntity } from 'src/event_place_cost_options/entities/event_place_cost_option.entity';
import { EventPlaceTagEntity } from 'src/event_place_tags/entities/event_place_tag.entity';
import { ImageEntity } from 'src/images/entities/image.entity';
import { InfoEntity } from 'src/info/entities/info.entity';
import { PlaceDirections } from '../directions';
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
import { EventEntity } from 'src/event/entities/event.entity';
import { RatingEntity } from 'src/rating/entities/rating.entity';
import { ShortEntity } from 'src/short/entities/short.entity';
import { CommentEntity } from 'src/comments/entities/comment.entity';

@ObjectType()
@Entity('places')
export class PlaceEntity extends DefaultFieldsEntity {
  @Field({ defaultValue: 'places' })
  @Column({ default: 'places' })
  categry: string;

  @Field(() => PlaceDirections)
  @Column({ type: 'enum', enum: PlaceDirections })
  direction: PlaceDirections;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.places)
  user: Promise<UserEntity>;

  @Field(() => Int)
  @Column()
  cityId: number;

  @Field(() => CityEntity)
  @ManyToOne(() => CityEntity, (city) => city.places)
  city: Promise<CityEntity>;

  @Field(() => [ImageEntity])
  @OneToMany(() => ImageEntity, (image) => image.place, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  images: Promise<ImageEntity[]>;

  @Field(() => InfoEntity)
  @OneToOne(() => InfoEntity, (info) => info.place, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  info: Promise<InfoEntity>;

  @Field(() => [EventPlaceTagEntity])
  @OneToMany(() => EventPlaceTagEntity, (tag) => tag.place)
  tags: Promise<EventPlaceTagEntity[]>;

  @Field(() => [EventPlaceCostOptionEntity])
  @OneToMany(() => EventPlaceCostOptionEntity, (costOption) => costOption.place)
  costOption: Promise<EventPlaceCostOptionEntity[]>;

  @Field(() => [RatingEntity], { nullable: true })
  @OneToMany(() => RatingEntity, (wBady) => wBady.place)
  rating?: Promise<RatingEntity[]>;

  @Field(() => [ShortEntity], { nullable: true })
  @OneToMany(() => ShortEntity, (short) => short.place)
  shorts?: Promise<ShortEntity[]>;

  @Field(() => [CommentEntity], { nullable: true })
  @OneToMany(() => CommentEntity, (comment) => comment.place)
  comments?: Promise<CommentEntity[]>;

  @Field(() => [WidgetBodyEntity], { nullable: true })
  @OneToMany(() => WidgetBodyEntity, (wBady) => wBady.place)
  body?: Promise<WidgetBodyEntity[]>;

  @Field(() => [EventEntity], { nullable: true })
  @OneToMany(() => EventEntity, (events) => events.place)
  events?: Promise<EventEntity[]>;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
