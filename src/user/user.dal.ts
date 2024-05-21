import { Injectable } from '@nestjs/common';

// @@ Mongoose
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// @@ Schemas
import { User } from './user.schema';

// @@ Dtos
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// @@ Types
import { ObjectId } from 'typeorm';

@Injectable()
export class UserDal {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User | undefined> {
    const newUser = new this.userModel(createUserDto);
    await newUser.save();

    delete newUser.password;

    return newUser;
  }

  findById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id);
  }

  findByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username });
  }

  async findByIdAndUpdate(
    id: ObjectId,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
    );

    return updatedUser;
  }

  findByIdAndDelete(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
