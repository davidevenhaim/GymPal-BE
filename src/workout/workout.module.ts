import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from '../authentication/authentication.module';

import { WorkoutService } from './workout.service';

import { WorkoutController } from './workout.controller';

import { Workout, WorkoutSchema } from './workout.schema';

import { WorkoutDal } from './workout.dal';

import { AuthGuard } from '../common/guards/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Workout.name, schema: WorkoutSchema }]),
    AuthenticationModule,
  ],
  controllers: [WorkoutController],
  providers: [WorkoutService, WorkoutDal, AuthGuard],
})
export class WorkoutModule {}
