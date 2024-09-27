import { registerEnumType } from '@nestjs/graphql';

export enum Widgets {
  Static_collections = 'static_collections',
  Dynamic_collections = 'dynamic_collections',
  Create_event = 'create_event',
  Create_place = 'create_place',
  Go = 'go',
  Map = 'map',
  Client = 'client',
}

registerEnumType(Widgets, {
  name: 'Widgets',
  description: 'Описание виджетов',
  valuesMap: {
    Static_collections: { description: 'статические подборки' },
    Dynamic_collections: { description: 'динамические подборки' },
    Create_event: { description: 'создать свое событие' },
    Create_place: { description: 'создать свое место' },
    Go: { description: 'не знаешь куда пойти' },
    Map: { description: 'карта' },
    Client: {
      description: 'отдельная большая карточка места или события клиента',
    },
  },
});
