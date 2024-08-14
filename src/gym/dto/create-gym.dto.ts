import { IsArray } from '@nestjs/class-validator';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

import { DaysOfWeek } from '../../common/utils/enums';

// @@ Schemas
import { WorkHours } from '../gym.schema';
import { Location } from '../../common/utils/classes';
import { Prop } from '@nestjs/mongoose';

export class CreateGymDto {
  @Prop({ name: 'name', type: String })
  @IsString()
  name: string;

  @Prop({ name: 'location', type: Location })
  location: Location;

  @Prop({ name: 'workingHours', type: Array })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(Object.keys(DaysOfWeek).length)
  @ArrayMaxSize(Object.keys(DaysOfWeek).length)
  workingHours: WorkHours[];

  @Prop({ name: 'rating', type: Number })
  @IsNumber()
  rating: number;
}
