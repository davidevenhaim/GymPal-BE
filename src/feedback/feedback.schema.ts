// @@ Mongoose
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { PrimaryGeneratedColumn } from 'typeorm';
// @@ Object Validator
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

// @@ Mongoose
import mongoose, { ObjectId, now } from 'mongoose';

// @@ Utils
import { MAX_OPEN_INPUT_LENGTH } from '../common/utils/constants';

// @@ Schemas
import { Gym } from '../gym/gym.schema';
import { User } from '../user/user.schema';

@Schema({ timestamps: true })
export class Feedback {
  @Prop({ type: 'string' })
  @PrimaryGeneratedColumn()
  _id: ObjectId;

  @Prop({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(MAX_OPEN_INPUT_LENGTH)
  comment: string;

  @Prop({ type: 'number' })
  @IsNumber()
  rating: number;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Gym' }],
  })
  gym: Gym;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  user: User;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
