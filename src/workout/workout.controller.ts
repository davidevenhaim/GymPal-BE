import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
  Req,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';

// @@ Dto's
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

// @@ Guards
import { AuthGuard } from '../common/guards/auth.guard';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post('create')
  create(@Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutService.create(createWorkoutDto);
  }

  @Get()
  findAll() {
    return this.workoutService.findAll();
  }

  @Get('gym/:id')
  findByGym(@Param('id') id: string, @Req() request: Request) {
    const userId = request['user']?._id;
    return this.workoutService.findByGym(id, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto) {
    return this.workoutService.update(id, updateWorkoutDto);
  }

  @Delete('deleteall')
  deleteAll() {
    return this.workoutService.deleteAll();
  }
}
