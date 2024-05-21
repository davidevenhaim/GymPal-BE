import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ObjectId } from 'typeorm';

//   @@ Utils
import { Workout } from '../../workout/workout.schema';

export class UserReponseDto {
  @IsNotEmpty()
  user: UserDto;

  @IsNotEmpty()
  @IsString()
  token: string;
}

class UserDto {
  @IsNotEmpty()
  _id: ObjectId;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  updatedAt: Date;

  @IsNotEmpty()
  workouts: Workout[];
}
