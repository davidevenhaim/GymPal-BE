import { IsString } from 'class-validator';

// @@ Mongoose
import { ObjectId } from 'mongoose';

// @@ Schemas
import { Gym } from '../gym.schema';

export class GymResponseDto extends Gym {
  @IsString()
  _id: ObjectId;
}
