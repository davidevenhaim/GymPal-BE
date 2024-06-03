import { MAX_RANDOM_GYMS_AT_ONCE } from './constants';

export const isMoreThanMax = (num: number) =>
  num > MAX_RANDOM_GYMS_AT_ONCE ? MAX_RANDOM_GYMS_AT_ONCE : num;

export const getRandomIntegerInRange = (max, min = 0): number => {
  if (min > max) {
    return 0;
  }
  if (min === 0) {
    return Math.floor(Math.random() * max);
  } else {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

type enumType = { [key: string]: string | number };

export const getEnumValues = (enumObj: enumType) => {
  return Object.values(enumObj).filter((value) => typeof value === 'string');
};
