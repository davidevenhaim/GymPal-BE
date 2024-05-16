import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from '@nestjs/class-validator';
import { Column } from 'typeorm';

// @@ Utils
import { ExerciseType } from '../common/utils/enums';
import { MAX_STRING_LENGTH } from '../common/utils/constants';

export interface iExercise {
  name: string;
  muscle: ExerciseType;
  weight: number;
  duration: number;
}

export class Exercise {
  constructor(data: iExercise) {
    const { duration, muscle, name, weight } = data;
    this.duration = duration;
    this.muscle = muscle;
    this.name = name;
    this.weight = weight;
  }

  @Column({ type: 'varchar', length: MAX_STRING_LENGTH })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @Column({ type: 'enum', enum: ExerciseType, default: ExerciseType.CARDIO })
  @IsNotEmpty()
  muscle: ExerciseType;

  @Column({ type: 'number', nullable: true })
  @IsNumber()
  weight: number;

  @Column({ type: 'number' })
  duration: number;
}

export interface iLocation {
  lng: number;
  lat: number;
}

export class Location {
  constructor(location: iLocation) {
    const { lat, lng } = location;

    this.lat = lat;
    this.lng = lng;
  }

  @Column({ type: 'number' })
  lng: number;

  @Column({ type: 'number' })
  lat: number;
}
