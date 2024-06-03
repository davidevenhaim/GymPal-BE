import { Injectable } from '@nestjs/common';

// @@ Mongoose
import { InjectModel } from '@nestjs/mongoose';
import { Model, mongo } from 'mongoose';

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

  findById(id: string): Promise<Gym | undefined> {
    return this.GymModel.findById(id);
  }

  findAll(): Promise<Gym[]> {
    return this.GymModel.find();
  }

  findByIdAndUpdate(
    id: ObjectId,
    updateGymDto: UpdateGymDto,
  ): Promise<Gym | undefined> {
    return this.GymModel.findByIdAndUpdate(id, updateGymDto);
  }

  deleteAll(): Promise<mongo.DeleteResult> {
    return this.GymModel.deleteMany();
  }

  findByIdAndDelete(id): Promise<mongo.DeleteResult> {
    return this.GymModel.findByIdAndDelete(id);
  }

  isGymExists(name: string, location: Location) {
    return this.GymModel.findOne({
      name,
      'location.lat': location.lat,
      'location.lng': location.lng,
    });
  }
}
