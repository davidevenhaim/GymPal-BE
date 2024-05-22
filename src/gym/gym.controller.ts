import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateGymDto } from './dto/create-gym.dto';
import { UpdateGymDto } from './dto/update-gym.dto';
import { GymService } from './gym.service';

@Controller('gym')
export class GymController {
  constructor(private readonly GymService: GymService) {}

  @Post('create')
  create(@Body() createWorkoutDto: CreateGymDto) {
    return this.GymService.create(createWorkoutDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.GymService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateWorkoutDto: UpdateGymDto) {
    return this.GymService.update(id, updateWorkoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.GymService.deleteGym(id);
  }
}
