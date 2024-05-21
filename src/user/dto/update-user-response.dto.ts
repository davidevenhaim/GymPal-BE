import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from '@nestjs/class-validator';

//   @@ Utils
import { MAX_STRING_LENGTH } from '../../common/utils/constants';
import { Prop } from '@nestjs/mongoose';
import { Workout } from '../../workout/workout.schema';

export class UpdateUserReponseDto {
  @Prop({ type: 'string', unique: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(MAX_STRING_LENGTH)
  username: string;

  @Prop({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(MAX_STRING_LENGTH)
  name: string;

  @Prop({ type: Workout })
  workouts: Workout[];
}
