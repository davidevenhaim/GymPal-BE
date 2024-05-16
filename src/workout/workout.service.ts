import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import {
  getNewServerResponse,
  iServerResponse,
} from '../common/dto/response.dto';

// @@ Schemas
import { Workout } from '../schemas/workout.schema';

// @@ Mongoose
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectModel(Workout.name) private workoutModel: Model<Workout>,
  ) {}

  async create(createWorkoutDto: CreateWorkoutDto): Promise<iServerResponse> {
    const res = getNewServerResponse();
    const newWorkout = new this.workoutModel(createWorkoutDto);

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

  update(id: number, updateWorkoutDto: UpdateWorkoutDto) {
    return `This action updates a #${id} workout`;
  }

  remove(id: number) {
    return `This action removes a #${id} workout`;
  }
}
