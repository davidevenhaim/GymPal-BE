// @@ Class validators
import { IsNotEmpty, IsString, MinLength } from '@nestjs/class-validator';

// @@ Mongoose
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

// @@ Constants
import { MAX_STRING_LENGTH } from '../common/utils/constants';

// @@ Schemas
import { Gym } from '../gym/gym.schema';

export type WorkoutDocument = HydratedDocument<Workout>;

@Schema()
export class Workout {
  @Prop({ type: 'string', length: MAX_STRING_LENGTH })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Gym' }],
  })
  gym: Gym;
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
