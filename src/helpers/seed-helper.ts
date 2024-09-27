import * as getRandomElements from 'random-elements-array';
import { faker } from '@faker-js/faker';

interface Ioptions {
  min?: number;
  max?: number;
  count?: number;
}

export const RandomsID = async (
  arr: number[] | string[],
  options?: Ioptions,
) => {
  const min = options?.min ? options?.min : 5;
  const max = options?.max ? options?.max : 12;
  const rCount = options?.count
    ? options?.count
    : faker.number.int({ min, max });
  return await getRandomElements(arr, rCount);
};

export const randomNumber = (min = 5, max = 12) =>
  faker.number.int({ min, max });
export const randomPrice = (min = 300, max = 1200) =>
  faker.number.int({ min, max });
