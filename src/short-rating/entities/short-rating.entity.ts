import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ShortEntity } from 'src/short/entities/short.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('short_ratings')
export class ShortRatingEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  shortId: number;

  @Field(() => Int)
  @Column({ default: 0 })
  like: number;

  @Field(() => Int)
  @Column({ default: 0 })
  dislike: number;

  @Field(() => ShortEntity)
  @ManyToOne(() => ShortEntity, (short) => short.ratings)
  short: ShortEntity;
}
