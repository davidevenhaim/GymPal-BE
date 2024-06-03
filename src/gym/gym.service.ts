import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ObjectId } from 'typeorm';

// @@ DAL
import { GymDal } from './gym.dal';

// @@ Dto's
import { CreateGymDto } from './dto/create-gym.dto';
import { UpdateGymDto } from './dto/update-gym.dto';
import { GymResponseDto } from './dto/gym-response.dto';

// @@ Utils
import { generateRandomGym } from '../common/utils/generateGym';
import { isMoreThanMax } from '../common/utils/helperFunctions';

@Injectable()
export class GymService {
  constructor(private readonly gymDal: GymDal) {}

  async create(createGymDto: CreateGymDto): Promise<GymResponseDto> {
    const isGymExists = await this.gymDal.isGymExists(
      createGymDto.name,
      createGymDto.location,
    );

    if (isGymExists) {
      throw new BadRequestException('GymExists');
    }

    const newGym = await this.gymDal.createGym(createGymDto);

    return newGym;
  }

  async generateNewGyms(count: number): Promise<boolean> {
    if (isNaN(count)) {
      return false;
    }
    const numberOfGmys = isMoreThanMax(count);

    const promisesArr = [];
    for (let i = 0; i < numberOfGmys; i++) {
      const createGymDto = generateRandomGym();

      const newGym = this.gymDal.createGym(createGymDto);
      promisesArr.push(newGym);
    }

    await Promise.all(promisesArr);

    return true;
  }

  async findOne(id: string): Promise<GymResponseDto> {
    const gym = await this.gymDal.findById(id);
    if (!gym) {
      throw new NotFoundException('GymDoesntExists');
    }

    return gym;
  }

  async findAll(): Promise<GymResponseDto[]> {
    const gyms = await this.gymDal.findAll();

    return gyms;
  }

  async update(id: string, updateGymDto: UpdateGymDto) {
    const objId = new ObjectId(id);
    const updatedGym = await this.gymDal.findByIdAndUpdate(objId, updateGymDto);

    return updatedGym;
  }

  async deleteAll() {
    const deleteResponse = await this.gymDal.deleteAll();

    if (deleteResponse.deletedCount > 0) {
      return true;
    }

    return false;
  }

  async deleteGym(id: string) {
    const deleteResponse = await this.gymDal.findByIdAndDelete(id);

    if (deleteResponse.deletedCount > 0) {
      return true;
    }

    return false;
  }
}
