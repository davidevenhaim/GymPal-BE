import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
// @@ Services
import { GymService } from './gym.service';

// @@ Dto's
import { CreateGymDto } from './dto/create-gym.dto';
import { UpdateGymDto } from './dto/update-gym.dto';

// @@ Interceptors
import { GymTransformInterceptor } from '../common/interceptor/gym-transform.interceptor';

@Controller('gym')
export class GymController {
  constructor(private readonly GymService: GymService) {}

  @Post('create')
  create(@Body() createWorkoutDto: CreateGymDto) {
    return this.GymService.create(createWorkoutDto);
  }

  @Post('generate/:count')
  generateGyms(@Param('count') count: string) {
    console.log(`Generating ${count} gyms`);
    return this.GymService.generateNewGyms(Number(count));
  }

  @Get('all')
  @UseInterceptors(GymTransformInterceptor)
  findGyms() {
    return this.GymService.findAll();
  }

  @Get(':id')
  @UseInterceptors(GymTransformInterceptor)
  findOne(@Param('id') id: string) {
    return this.GymService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateWorkoutDto: UpdateGymDto) {
    return this.GymService.update(id, updateWorkoutDto);
  }

  @Delete('all')
  removeAll() {
    return this.GymService.deleteAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.GymService.deleteGym(id);
  }
}
