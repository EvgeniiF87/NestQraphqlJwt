import { ObjectType, Field, Int } from '@nestjs/graphql';
import { EventEntity } from 'src/event/entities/event.entity';
import { PlaceEntity } from 'src/place/entities/place.entity';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { ShortRatingEntity } from 'src/short-rating/entities/short-rating.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('shorts')
export class ShortEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  path: string;

  @Field(() => Int)
  @Column({ default: 0 })
  views?: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  eventId?: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  placeId?: number;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field(() => EventEntity, { nullable: true })
  @ManyToOne(() => EventEntity, (event) => event.shorts)
  event: EventEntity;

  @Field(() => PlaceEntity, { nullable: true })
  @ManyToOne(() => PlaceEntity, (place) => place.shorts)
  place: PlaceEntity;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.shorts)
  user: UserEntity;

  @Field(() => ShortRatingEntity)
  @OneToMany(() => ShortRatingEntity, (rating) => rating.short)
  ratings: ShortRatingEntity;

  @Field(() => [CommentEntity], { nullable: true })
  @OneToMany(() => CommentEntity, (comment) => comment.short)
  comments?: Promise<CommentEntity[]>;
}
