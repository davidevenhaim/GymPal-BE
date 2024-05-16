import {
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ObjectId,
  ManyToOne,
} from 'typeorm';

import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from '@nestjs/class-validator';

// @@ Mongoose
import { Schema, SchemaFactory } from '@nestjs/mongoose';

// @@ Constants
import { MAX_STRING_LENGTH } from '../common/utils/constants';

// @@ Schemas
import { User } from './user.schema';
import { HydratedDocument } from 'mongoose';

// @@ types
import { Exercise, Location } from './commontypes';

export type WorkoutDocument = HydratedDocument<Workout>;

@Schema()
export class Workout {
  @PrimaryGeneratedColumn('uuid')
  _id: ObjectId;

  @Column({ type: 'varchar', length: MAX_STRING_LENGTH })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @Column(() => Exercise)
  // the user's excercise - default value empty array.
  exercise: Exercise[];

  @Column(() => Location)
  location: Location;

  @ManyToOne(() => User, (user) => user.workouts)
  @IsNotEmpty()
  user: User;
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
