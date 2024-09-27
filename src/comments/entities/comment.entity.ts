import { ObjectType, Field, Int } from '@nestjs/graphql';
import { EventEntity } from 'src/event/entities/event.entity';
import { PlaceEntity } from 'src/place/entities/place.entity';
import { ShortEntity } from 'src/short/entities/short.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('comments')
export class CommentEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  shortId?: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  eventId?: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  placeId?: number;

  @Field()
  @Column()
  comment: string;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.comments)
  user: UserEntity;

  @Field(() => ShortEntity)
  @ManyToOne(() => ShortEntity, (short) => short.comments)
  short: ShortEntity;

  @Field(() => EventEntity)
  @ManyToOne(() => EventEntity, (event) => event.comments)
  event: EventEntity;

  @Field(() => PlaceEntity)
  @ManyToOne(() => PlaceEntity, (place) => place.comments)
  place: PlaceEntity;
}
