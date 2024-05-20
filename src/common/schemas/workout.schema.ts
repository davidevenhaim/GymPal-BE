import {
  PrimaryGeneratedColumn,
  Column,
  ObjectId,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from '@nestjs/class-validator';

// @@ Mongoose
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// @@ Constants
import { MAX_STRING_LENGTH } from '../utils/constants';

// @@ Schemas
import { User } from './user.schema';
import mongoose, { HydratedDocument } from 'mongoose';

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

  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', default: [] },
    ],
  })
  exercise: Exercise[];

  @Column(() => Location)
  location: Location;

  @ManyToOne(() => User, (user) => user.workouts)
  @IsNotEmpty()
  user: User;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
