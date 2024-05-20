import { IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Location {
  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  lng: number;
}
