import { IsNumber } from 'class-validator';

// @@ Mongoose
import { Prop } from '@nestjs/mongoose';

interface iLocation {
  lat: number;
  lng: number;
}

export class Location {
  constructor(location: iLocation) {
    const { lat, lng } = location;

    this.lat = lat;
    this.lng = lng;
  }

  @Prop({ type: 'number' })
  @IsNumber()
  lng: number;

  @Prop({ type: 'number' })
  @IsNumber()
  lat: number;
}
