import { ObjectType, Field, Int } from '@nestjs/graphql';
import { EventEntity } from 'src/event/entities/event.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('visitors')
export class VisitorEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field(() => Int)
  @Column()
  eventId: number;

  @Field(() => Date)
  @Column({ type: 'timestamp' })
  date?: Date;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.visitors)
  user: UserEntity;

  @Field(() => EventEntity)
  @ManyToOne(() => EventEntity, (event) => event.visitors)
  event: EventEntity;
}
