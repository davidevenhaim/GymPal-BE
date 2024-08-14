import { IsString } from 'class-validator';

// @@ Nestjs
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from '@nestjs/class-validator';
import { Prop } from '@nestjs/mongoose';

// @@ Mongoose
import { ObjectId } from 'mongoose';

// @@ Schemas
import { Exercise, Workout } from '../workout.schema';
import {
  MAX_STRING_LENGTH,
  MIN_STRING_LENGTH,
} from '../../common/utils/constants';

export class WorkoutResponseDto extends Workout {
  @IsString()
  _id: ObjectId;
}

export class CreateWorkoutDto {
  @Prop({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  gym: string;

  @Prop({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  @MinLength(MIN_STRING_LENGTH)
  @MaxLength(MAX_STRING_LENGTH)
  name: string;

  @Prop({ name: 'exercises', type: Array })
  @IsArray()
  @ArrayMinSize(1)
  exercises: Exercise[];

  @Prop({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  user: string;
}
