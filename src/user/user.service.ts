import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// @@ Mongoose
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// @@ Schemas
import { User } from '../schemas/user.schema';

// @@ Constants
import { HASH_SALT_ROUNDS } from '../common/utils/constants';

// @@ Dto's
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  getNewServerResponse,
  iServerResponse,
  serverResponseErr,
} from '../common/dto/response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(user: User): Promise<iServerResponse> {
    let res = getNewServerResponse();
    const isUserExists = await this.findByUsername(user.username);
    if (isUserExists) {
      console.warn('Trying to create a user that already exists.');
      throw new BadRequestException('userExists');
    }

    const hashedPassword = await bcrypt.hash(user.password, HASH_SALT_ROUNDS);

    res = await this.create({ ...user, password: hashedPassword });

    return res;
  }

  async create(createUserDto: CreateUserDto): Promise<iServerResponse> {
    const res = getNewServerResponse();

    const newUser = new this.userModel(createUserDto);
    await newUser.save();

    delete newUser.password;

    const token = await this.jwtService.signAsync({
      ...newUser,
    });

    res.data = {
      token,
    };

    return res;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string): Promise<iServerResponse> {
    const res = getNewServerResponse();

    const user = await this.findById(id);
    if (!user) {
      console.warn("Searching for a user that coudn't be found.");
      throw new NotFoundException("User couldn't be found.");
    }

    res.data = user;
    return res;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<iServerResponse> {
    const res = getNewServerResponse();

    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
    );

    res.data = updatedUser;
    return res;
  }

  async remove(id: string) {
    const res = getNewServerResponse();
    await this.userModel.findByIdAndDelete(id);

    res.msg = 'Deleted succesfully';
    return res;
  }

  private async findById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id);
  }

  private async findByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ where: { username } });
  }
}
