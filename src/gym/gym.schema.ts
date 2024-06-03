// @@ Mongoose
import { Schema as MongooseSchema } from 'mongoose';
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

export class WorkHours {
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

@Schema({ timestamps: true })
export class Gym {
  @PrimaryGeneratedColumn()
  _id: ObjectId;

  @Prop({ type: [WorkHours] })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(Object.keys(DaysOfWeek).length)
  @ArrayMaxSize(Object.keys(DaysOfWeek).length)
  workingHours: WorkHours[];

  @Prop({ type: MongooseSchema.Types.String })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(MAX_STRING_LENGTH)
  name: string;

  @Prop({ type: Location })
  @IsNotEmpty()
  location: Location;

  @Prop({ type: MongooseSchema.Types.Number })
  @IsNumber()
  rating: number;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const GymSchema = SchemaFactory.createForClass(Gym);
