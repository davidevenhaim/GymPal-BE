import { Injectable } from '@nestjs/common';

// @@ Mongoose
import { InjectModel } from '@nestjs/mongoose';
import { Model, mongo } from 'mongoose';

// @@ Schemas
import { Workout } from './workout.schema';
import { ObjectId } from 'typeorm';

// @@ Dto's
import { UpdateWorkoutDto } from './dto/update-Workout.dto';
import { CreateWorkoutDto } from './dto/create-Workout.dto';

@Injectable()
export class WorkoutDal {
  constructor(
    @InjectModel(Workout.name)
    private WorkoutModel: Model<Workout>,
  ) {}

  async createWorkout(
    createWorkoutDto: CreateWorkoutDto,
  ): Promise<Workout | undefined> {
    const newWorkout = new this.WorkoutModel(createWorkoutDto);
    await newWorkout.save();

    return newWorkout;
  }

  findByGymId(id: string): Promise<Workout[] | undefined> {
    return this.WorkoutModel.find({ gym: id });
  }

  findById(id: string): Promise<Workout | undefined> {
    return this.WorkoutModel.findById(id);
  }

  findAll(): Promise<Workout[]> {
    return this.WorkoutModel.find();
  }

  findByIdAndUpdate(
    id: ObjectId,
    updateWorkoutDto: UpdateWorkoutDto,
  ): Promise<Workout | undefined> {
    return this.WorkoutModel.findByIdAndUpdate(id, updateWorkoutDto);
  }

  findByIdAndDelete(id): Promise<mongo.DeleteResult> {
    return this.WorkoutModel.findByIdAndDelete(id);
  }
}
