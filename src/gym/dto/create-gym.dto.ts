import { IsArray, IsNotEmpty } from '@nestjs/class-validator';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DaysOfWeek } from '../../common/utils/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Location } from 'src/common/schemas/commontypes';

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

export class WorkHours {
  @ApiProperty({ name: 'isOpen', type: Boolean, default: true })
  isOpen: boolean; // for closed days.

  @ApiProperty({ name: 'start' })
  @IsNotEmpty()
  start: string;

  @ApiProperty({ name: 'end' })
  @IsNotEmpty()
  end: string;

  @ApiProperty({ type: 'enum', enum: DaysOfWeek })
  @IsNotEmpty()
  day: DaysOfWeek;
}
