// @@ Mongoose
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

// @@ Typeorm
import { PrimaryGeneratedColumn, ObjectId } from 'typeorm';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from '@nestjs/class-validator';

// @@ Schemas
import { Workout } from '../workout/workout.schema';

// @@ Constants
import { MAX_STRING_LENGTH } from '../common/utils/constants';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @PrimaryGeneratedColumn('uuid')
  _id: ObjectId;

  @Prop({
    type: MongooseSchema.Types.String,
    // unique: true // Just for testing.
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(MAX_STRING_LENGTH)
  username: string;

  @Prop({ type: MongooseSchema.Types.String })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(MAX_STRING_LENGTH)
  name: string;

  @Prop({ type: MongooseSchema.Types.String })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(MAX_STRING_LENGTH)
  password: string;

  @Prop({ default: mongoose.now() })
  createdAt: Date;

  @Prop({ default: mongoose.now() })
  updatedAt: Date;

  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Workout', default: [] },
    ],
  })
  workouts: Workout[];
}

export const UserSchema = SchemaFactory.createForClass(User);
