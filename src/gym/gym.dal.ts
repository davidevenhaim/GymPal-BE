import { Injectable } from '@nestjs/common';

// @@ Mongoose
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// @@ Schemas
import { Gym } from './gym.schema';
import { ObjectId } from 'typeorm';

// @@ Dto's
import { UpdateGymDto } from './dto/update-gym.dto';
import { CreateGymDto } from './dto/create-gym.dto';

//
import { Location } from '../common/utils/classes';

@Injectable()
export class GymDal {
  constructor(
    @InjectModel(Gym.name)
    private GymModel: Model<Gym>,
  ) {}

  async createGym(createGymDto: CreateGymDto): Promise<Gym | undefined> {
    const newGym = new this.GymModel(createGymDto);
    await newGym.save();

    return newGym;
  }

  findByIdAndDelete(id): Promise<Gym | undefined> {
    return this.GymModel.findByIdAndDelete(id);
  }

  findById(id: string): Promise<Gym | undefined> {
    return this.GymModel.findById(id);
  }

  findByName(name: string): Promise<Gym | undefined> {
    return this.GymModel.findOne({ name });
  }

  findByIdAndUpdate(
    id: ObjectId,
    updateGymDto: UpdateGymDto,
  ): Promise<Gym | undefined> {
    return this.GymModel.findByIdAndUpdate(id, updateGymDto);
  }

  isGymExists(name: string, location: Location) {
    return this.GymModel.findOne({
      name,
      'location.lat': location.lat,
      'location.lng': location.lng,
    });
  }
}
