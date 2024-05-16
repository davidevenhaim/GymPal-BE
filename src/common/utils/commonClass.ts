import { IsNotEmpty } from '@nestjs/class-validator';
import { Column } from 'typeorm';

export class Location {
  @Column({ type: 'number' })
  @IsNotEmpty()
  lng: number;
}
