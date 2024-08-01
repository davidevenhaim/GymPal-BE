import { Schema as MongooseSchema } from 'mongoose';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateNested,
} from '@nestjs/class-validator';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { MAX_STRING_LENGTH } from '../common/utils/constants';

import { Gym } from '../gym/gym.schema';

export type WorkoutDocument = HydratedDocument<Workout>;

export class Exercise {
  @Prop({ type: MongooseSchema.Types.String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Prop({ type: MongooseSchema.Types.String })
  @IsString()
  description: string;
}

@Schema()
export class Workout {
  @Prop({ type: MongooseSchema.Types.String, length: MAX_STRING_LENGTH })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @Prop({ type: [Exercise] })
  @IsArray()
  @ValidateNested({ each: true })
  exercises: Exercise[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Gym' }],
  })
  gym: Gym;
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
