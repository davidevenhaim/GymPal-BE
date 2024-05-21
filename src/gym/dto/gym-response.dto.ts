import { IsArray, IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

// @@ Mongoose
import { ObjectId } from 'mongoose';

// @@ Schemas
import { Gym } from '../gym.schema';

export class GymResponseDto extends Gym {
  @IsString()
  _id: ObjectId;
}
