import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { EventEntity } from 'src/event/entities/event.entity';
import { PlaceEntity } from 'src/place/entities/place.entity';
import { RatingEntity } from 'src/rating/entities/rating.entity';
import { RoleEntity } from 'src/role/entities/role.entity';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { ShortEntity } from 'src/short/entities/short.entity';
import { StatisticEntity } from 'src/statistics/entities/statistic.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { VisitorEntity } from 'src/visitor/entities/visitor.entity';

@ObjectType()
@Entity('users')
export class UserEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field({ nullable: true })
  @Column({ unique: true, nullable: true })
  phone: string;

  @Field()
  @Column()
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  geo: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar: string;

  @Field(() => Int)
  @Column()
  roleId: number;

  @Field(() => RoleEntity)
  @ManyToOne(() => RoleEntity, (role) => role.user)
  role: RoleEntity;

  @Field(() => [EventEntity], { nullable: true })
  @OneToMany(() => EventEntity, (event) => event.user)
  events: EventEntity[];

  @Field(() => [PlaceEntity], { nullable: true })
  @OneToMany(() => PlaceEntity, (place) => place.user)
  places: PlaceEntity[];

  @Field(() => [ShortEntity], { nullable: true })
  @OneToMany(() => ShortEntity, (short) => short.user)
  shorts?: Promise<ShortEntity[]>;

  @Field(() => [CommentEntity], { nullable: true })
  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments?: Promise<CommentEntity[]>;

  @Field(() => [RatingEntity], { nullable: true })
  @OneToMany(() => RatingEntity, (rating) => rating.user)
  rating?: Promise<RatingEntity[]>;

  @Field(() => [StatisticEntity], { nullable: true })
  @OneToMany(() => StatisticEntity, (statistic) => statistic.user)
  statistics?: Promise<StatisticEntity[]>;

  @Field(() => [VisitorEntity], { nullable: true })
  @OneToMany(() => VisitorEntity, (visit) => visit.user)
  visitors?: Promise<VisitorEntity[]>;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
