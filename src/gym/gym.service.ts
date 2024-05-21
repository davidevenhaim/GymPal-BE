import { Injectable } from '@nestjs/common';

// @@ DAL
import { GymDal } from './gym.dal';

// @@ Dto's
import { CreateGymDto } from './dto/create-gym.dto';
import { UpdateGymDto } from './dto/update-gym.dto';
import { ObjectId } from 'typeorm';
import { GymResponseDto } from './dto/gym-response.dto';

@Injectable()
export class GymService {
  constructor(private readonly gymDal: GymDal) {}

  async create(createGymDto: CreateGymDto): Promise<GymResponseDto> {
    const isGymExists = await this.gymDal.isGymExists(
      createGymDto.name,
      createGymDto.location,
    );

    if (isGymExists) {
      throw new Error('GymExists');
    }

    const newGym = await this.gymDal.createGym(createGymDto);

    return newGym;
  }

  async findOne(id: string): Promise<GymResponseDto> {
    const gym = await this.gymDal.findById(id);
    if (!gym) {
      throw Error('GymDoesntExists');
    }

    return gym;
  }

  update(id: string, updateGymDto: UpdateGymDto) {
    const objId = new ObjectId(id);
    const updatedGym = this.gymDal.findByIdAndUpdate(objId, updateGymDto);

    return updatedGym;
  }

  deleteGym(id: string) {
    const deleteResponse = this.gymDal.findByIdAndDelete(id);
    if (deleteResponse) {
      return true;
    }

    return false;
  }
}
