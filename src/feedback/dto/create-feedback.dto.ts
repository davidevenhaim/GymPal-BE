import { IsNotEmpty, IsNumber, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackDto {
  @ApiProperty({ name: 'name', type: String })
  @IsString()
  comment: string;

  @ApiProperty({})
  @IsNotEmpty()
  gym: string;

  @ApiProperty({})
  @IsNotEmpty()
  user: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  rating: number;
}
