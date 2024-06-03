import { WorkHours } from '../../gym/gym.schema';
import { Location } from './classes';
import { DaysOfWeek } from './enums';
import { CreateGymDto } from '../../gym/dto/create-gym.dto';
import { getEnumValues, getRandomIntegerInRange } from './helperFunctions';

export const generateRandomGym = (): CreateGymDto => {
  const gym: CreateGymDto = {
    name: generateGymName(),
    location: generateLocationInTLV(),
    workingHours: generateWorkingHours(),
    rating: 0,
  };

  return gym;
};

const generateGymName = (): string => {
  const firstIndex = getRandomIntegerInRange(NAME_1.length);
  const secondIndex = getRandomIntegerInRange(NAME_2.length);
  return NAME_1[firstIndex] + ' ' + NAME_2[secondIndex];
};

const generateLocationInTLV = (): Location => {
  // Define the bounding box for Tel Aviv
  const minLat = 32.016667;
  const maxLat = 32.116667;
  const minLng = 34.75;
  const maxLng = 34.85;

  // Generate random latitude and longitude within the bounding box
  const lat = Math.random() * (maxLat - minLat) + minLat;
  const lng = Math.random() * (maxLng - minLng) + minLng;

  return new Location({ lat, lng });
};

const generateWorkingHours = (): WorkHours[] => {
  const workingHours: WorkHours[] = [];

  for (const day of getEnumValues(DaysOfWeek)) {
    workingHours.push({
      isOpen: true,
      start: getRandomIntegerInRange(10, 5) + ':00',
      end: getRandomIntegerInRange(23, 19) + ':00',
      day: day as DaysOfWeek,
    });
  }

  return workingHours;
};

const NAME_1 = [
  'Space',
  'Holmes',
  'Go',
  'Profit',
  'Fitness',
  'Icon',
  'Private',
  'Studio',
  'Crossfit',
];

const NAME_2 = [
  'Active',
  'Fit',
  'Land',
  'Classic',
  'Premium',
  'Place',
  'Planet',
  'House',
];
