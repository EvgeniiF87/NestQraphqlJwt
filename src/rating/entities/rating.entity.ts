import { ObjectType, Field, Int } from '@nestjs/graphql';
import { EventEntity } from 'src/event/entities/event.entity';
import { PlaceEntity } from 'src/place/entities/place.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('rating')
export class RatingEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  eventId?: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  placeId?: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  userId?: number;

  @Field(() => EventEntity, { nullable: true })
  @ManyToOne(() => EventEntity, (event) => event.rating)
  event?: EventEntity;

  @Field(() => PlaceEntity, { nullable: true })
  @ManyToOne(() => PlaceEntity, (place) => place.rating)
  place?: PlaceEntity;

  @Field(() => UserEntity, { nullable: true })
  @ManyToOne(() => UserEntity, (user) => user.rating)
  user?: UserEntity;

  @Field()
  @Column()
  stars: number;
}
