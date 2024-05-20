import { Injectable } from '@nestjs/common';

import {
  getNewServerResponse,
  iServerResponse,
} from '../common/dto/response.dto';

// @@ Schemas
import { Workout } from '../common/schemas/workout.schema';

// @@ Mongoose
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGymDto } from './dto/create-gym.dto';
import { UpdateGymDto } from './dto/update-gym.dto';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectModel(Workout.name) private workoutModel: Model<Workout>,
  ) {}

  async create(createGymDto: CreateGymDto): Promise<iServerResponse> {
    const res = getNewServerResponse();
    const newWorkout = new this.workoutModel(createGymDto);

    await newWorkout.save();

    res.data = newWorkout;
    return res;
  }

  findAll() {
    return `This action returns all workout`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workout`;
  }

  update(id: number, updateGymDto: UpdateGymDto) {
    return `This action updates a #${id} workout`;
  }

  remove(id: number) {
    return `This action removes a #${id} workout`;
  }
}
