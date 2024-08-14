import { Model } from 'mongoose';
import { ObjectId } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

import { Workout } from './workout.schema';

import { WorkoutDal } from './workout.dal';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectModel(Workout.name) private workoutModel: Model<Workout>,
    private readonly workoutDal: WorkoutDal,
  ) {}

  async create(createWorkoutDto: CreateWorkoutDto) {
    const newWorkout = new this.workoutModel(createWorkoutDto);

    await newWorkout.save();

    return newWorkout;
  }

  async findAll() {
    const allWorkouts = await this.workoutDal.findAll();

    return allWorkouts;
  }

  async findByGym(gymId: string): Promise<Workout[]> {
    const gymWorkouts = await this.workoutDal.findByGymId(gymId);
    return gymWorkouts;
  }

  async findOne(id: string) {
    const workout = await this.workoutDal.findById(id);

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
}
