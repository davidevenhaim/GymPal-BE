import { HttpStatus } from '@nestjs/common';
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

const str: string = 'string';

export const getErrLogMsg = (
  status: HttpStatus,
  msg?: string | object,
): string => {
  return `Server responded with status code ${status}. 
  ${
    msg && typeof msg === typeof str
      ? `With error message: ${msg}`
      : 'With no extra eror message. probably an internal server error.'
  }
    `;
};

export const removeAllSpaces = (str: string) => {
  return str.replace(/\s+/g, '');
};
