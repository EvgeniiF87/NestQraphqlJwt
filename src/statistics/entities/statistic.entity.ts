import { ObjectType, Field, Int } from '@nestjs/graphql';
import { EventEntity } from 'src/event/entities/event.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('statistics')
export class StatisticEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  day: string;

  @Field(() => Int)
  @Column()
  views: number;

  @Field(() => Date)
  @Column({ type: 'timestamp' })
  currentDay: Date;

  @Field(() => Int)
  @Column()
  eventId: number;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field(() => Date)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => EventEntity)
  @ManyToOne(() => EventEntity)
  event: EventEntity;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.statistics)
  user: UserEntity;
}
