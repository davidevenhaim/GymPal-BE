import { Injectable } from '@nestjs/common';

// @@ Mongoose
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

// @@ Schemas
import { User } from '../common/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserDal {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    await newUser.save();

    delete newUser.password;

    return newUser;
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ where: { username } });
  }

  async findByIdAndUpdate(id: ObjectId, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
    );

    return updatedUser;
  }
}
