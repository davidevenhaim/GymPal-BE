import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ObjectId,
} from 'typeorm';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from '@nestjs/class-validator';

// @@ Excersise
import { SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// @@ Constants
import { ExerciseType } from '../utils/enums';
import { MAX_STRING_LENGTH } from '../utils/constants';

export type ExcerciseDocument = HydratedDocument<Exercise>;

export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  _id: ObjectId;

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
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
