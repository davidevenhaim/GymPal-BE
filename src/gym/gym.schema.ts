// @@ Mongoose
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { PrimaryGeneratedColumn } from 'typeorm';
// @@ Object Validator
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

// @@ Mongoose
import { ObjectId, now } from 'mongoose';

// @@ Utils
import { Location } from '../common/utils/classes';
import { DaysOfWeek } from '../common/utils/enums';
import { MAX_STRING_LENGTH } from '../common/utils/constants';

@Schema({ timestamps: true })
export class Gym {
  @Prop({ type: 'string' })
  @PrimaryGeneratedColumn()
  _id: ObjectId;

  @Prop({ type: 'string' })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(Object.keys(DaysOfWeek).length)
  @ArrayMaxSize(Object.keys(DaysOfWeek).length)
  workingHours: WorkHours[];

  @Prop({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(MAX_STRING_LENGTH)
  name: string;

  @Prop({ type: Location })
  @IsNotEmpty()
  location: Location;

  @Prop({ type: 'number' })
  @IsNumber()
  rating: number;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const GymSchema = SchemaFactory.createForClass(Gym);

export class WorkHours {
  @PrimaryGeneratedColumn('uuid')
  _id: ObjectId;

  @Prop({ name: 'isOpen', type: Boolean, default: true })
  isOpen: boolean; // for closed days.

  @Prop({ name: 'start' })
  @IsNotEmpty()
  start: string;

  @Prop({ name: 'end' })
  @IsNotEmpty()
  end: string;

  @Prop({ type: 'enum', enum: DaysOfWeek })
  @IsNotEmpty()
  day: DaysOfWeek;
}
