import {
  add,
  endOfMonth,
  endOfWeek,
  isMonday,
  isSaturday,
  isSunday,
  isWeekend,
  nextSaturday,
  nextSunday,
  setDay,
  startOfMonth,
} from 'date-fns';

export const getStartAndEndWeek = () => {
  const monday = isMonday(new Date())
    ? setDay(new Date(), 2, { weekStartsOn: 1 }).toISOString().substring(0, 10)
    : setDay(new Date(), 1, { weekStartsOn: 1 }).toISOString().substring(0, 10);

  const sunday = endOfWeek(new Date(), {
    weekStartsOn: 1,
  })
    .toISOString()
    .substring(0, 10);

  return { monday, sunday };
};

export const getWeekEnd = () => {
  const currentDay = new Date();
  let saturdey: string;
  let sunday: string;

  if (isWeekend(currentDay)) {
    if (isSaturday(currentDay)) {
      saturdey = currentDay.toISOString().substring(0, 10);
      sunday = add(currentDay, { days: 1 }).toISOString().substring(0, 10);
    }

    if (isSunday(currentDay)) {
      saturdey = add(currentDay, { days: -1 }).toISOString().substring(0, 10);
      sunday = currentDay.toISOString().substring(0, 10);
    }
  } else {
    saturdey = nextSaturday(currentDay).toISOString().substring(0, 10);
    sunday = nextSunday(currentDay).toISOString().substring(0, 10);
  }

  return { saturdey, sunday };
};

export const getStartAndEndMonth = () => {
  const currentDay = new Date();
  const startMonth = add(startOfMonth(currentDay), { days: 1 })
    .toISOString()
    .substring(0, 10);
  const endMonth = endOfMonth(currentDay).toISOString().substring(0, 10);

  return { startMonth, endMonth };
};
