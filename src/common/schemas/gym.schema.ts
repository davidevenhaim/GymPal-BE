import { PrimaryGeneratedColumn } from 'typeorm';

// @@ Mongoose
import { ObjectId } from 'mongoose';
import { Schema } from '@nestjs/mongoose';

// @@ Object Validator
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

// @@ Dtos
import { WorkHours } from '../../gym/dto/create-gym.dto';

// @@ Utils
import { DaysOfWeek } from '../utils/enums';
import { MAX_STRING_LENGTH } from '../utils/constants';

@Schema()
export class Gym {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(Object.keys(DaysOfWeek).length)
  @ArrayMaxSize(Object.keys(DaysOfWeek).length)
  workingHours: WorkHours;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(MAX_STRING_LENGTH)
  name: string;

  @IsNotEmpty()
  location: Location;

  @IsNumber()
  rating: number;
}
