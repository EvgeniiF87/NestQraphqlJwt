import { ObjectType, Field, Int } from '@nestjs/graphql';
import { EventEntity } from 'src/event/entities/event.entity';
import { PlaceEntity } from 'src/place/entities/place.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('cities')
export class CityEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: 'Регион' })
  @Column()
  region: string;

  @Field({ description: 'Название города' })
  @Column()
  name: string;

  @Field({ description: 'Временная зона' })
  @Column()
  time_zons: string;

  @Field({ description: 'Часовой пояс' })
  @Column()
  utc: number;

  @Field({ description: 'Широта' })
  @Column()
  latitude: string;

  @Field({ description: 'Долгота' })
  @Column()
  longitude: string;

  @Field(() => [EventEntity], { nullable: true })
  @OneToMany(() => EventEntity, (event) => event.city)
  events: EventEntity[];

  @Field(() => [PlaceEntity], { nullable: true })
  @OneToMany(() => PlaceEntity, (place) => place.city)
  places: PlaceEntity[];
}
