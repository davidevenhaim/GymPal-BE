import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WorkoutService } from './workout.service';

import { WorkoutController } from './workout.controller';

import { Workout, WorkoutSchema } from './workout.schema';

import { WorkoutDal } from './workout.dal';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Workout.name, schema: WorkoutSchema }]),
  ],
  controllers: [WorkoutController],
  providers: [WorkoutService, WorkoutDal],
})
export class WorkoutModule {}
