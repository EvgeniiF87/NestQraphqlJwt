import { registerEnumType } from '@nestjs/graphql';

export enum Periods {
  CurrentDay = 'currentDay',
  NextDay = 'nextDay',
  Weekend = 'weekend',
  Week = 'week',
  Month = 'month',
}

registerEnumType(Periods, {
  name: 'Periods',
  description: 'Варианты выбора периодичности',
  valuesMap: {
    CurrentDay: { description: 'сегодня' },
    NextDay: { description: 'завтра' },
    Weekend: { description: 'эти выходные' },
    Week: { description: 'эта неделя' },
    Month: { description: 'этот месяц' },
  },
});
