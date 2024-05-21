// @@ Nestjs
import { PartialType } from '@nestjs/mapped-types';
import { IsString, MaxLength, MinLength } from '@nestjs/class-validator';
import { Prop } from '@nestjs/mongoose';

// @@ Dto's
import { CreateUserDto } from './create-user.dto';

// @@ Schemas
import { Workout } from '../../workout/workout.schema';

// @@ Utils
import { MAX_STRING_LENGTH } from '../../common/utils/constants';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @MinLength(2)
  @MaxLength(MAX_STRING_LENGTH)
  name: string;

  @Prop({ type: Workout })
  workouts: Workout[];
}
