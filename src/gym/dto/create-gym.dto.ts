import { IsArray } from '@nestjs/class-validator';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

import { DaysOfWeek } from '../../common/utils/enums';
import { ApiProperty } from '@nestjs/swagger';

// @@ Schemas
import { WorkHours } from '../gym.schema';
import { Location } from '../../common/utils/classes';

export class CreateGymDto {
  @ApiProperty({ name: 'name', type: String })
  @IsString()
  name: string;

  @ApiProperty({ name: 'location', type: Location })
  location: Location;

  @ApiProperty({ name: 'workingHours', type: Array })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(Object.keys(DaysOfWeek).length)
  @ArrayMaxSize(Object.keys(DaysOfWeek).length)
  workingHours: WorkHours;

  @ApiProperty({ name: 'rating', type: Number })
  @IsNumber()
  rating: number;
}
