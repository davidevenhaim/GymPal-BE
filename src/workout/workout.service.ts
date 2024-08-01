import { Model } from 'mongoose';
import { ObjectId } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import {
  getNewServerResponse,
  iServerResponse,
} from '../common/dto/response.dto';

import { Workout } from './workout.schema';

import { WorkoutDal } from './workout.dal';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectModel(Workout.name) private workoutModel: Model<Workout>,
    private readonly workoutDal: WorkoutDal,
  ) {}

  async create(createWorkoutDto: CreateWorkoutDto): Promise<iServerResponse> {
    const res = getNewServerResponse();
    const newWorkout = new this.workoutModel(createWorkoutDto);

    await newWorkout.save();

    res.data = newWorkout;
    return res;
  }

  async findAll() {
    const allWorkouts = await this.workoutDal.findAll();

    return allWorkouts;
  }

  async findOne(id: string) {
    const workout = await this.findOne(id);

    return workout;
  }

  async update(id: string, updateWorkoutDto: UpdateWorkoutDto) {
    const objId = new ObjectId(id);

    const updatedGym = await this.workoutDal.findByIdAndUpdate(
      objId,
      updateWorkoutDto,
    );

    return updatedGym;
  }

  async deleteWorkout(id: string) {
    const deletedWorkout = await this.workoutDal.findByIdAndDelete(id);

    return deletedWorkout;
  }
}
