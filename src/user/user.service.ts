import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

// @@ Services
import { AuthenticationService } from '../authentication/authentication.service';

// @@ DAL
import { UserDal } from './user.dal';

// @@ Dto's
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserReponseDto } from './dto/user-response.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ObjectId } from 'typeorm';
import { GetUserDto } from './dto/get-user-data.dto';

@Injectable()
export class UserService {
  constructor(
    private authService: AuthenticationService,
    private readonly userDal: UserDal,
  ) {}

  async registerUser(user: CreateUserDto): Promise<UserReponseDto> {
    const isUserExists = await this.userDal.findByUsername(user.username);
    if (isUserExists) {
      console.warn('Trying to create a user that already exists.');
      throw new BadRequestException('userExists');
    }

    const hashedPassword = await this.authService.encryptPassword(
      user.password,
    );

    const newUser = await this.userDal.createUser({
      ...user,
      password: hashedPassword,
    });

    const token = await this.authService.signToken(newUser);

    return { user: newUser, token };
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<UserReponseDto> {
    const user = await this.userDal.findByUsername(loginUserDto.username);

    if (!user) {
      throw new NotFoundException("User doesn't exists");
    }

    const isPasswordMatch = await this.authService.isPasswordMatch(
      user.password,
      loginUserDto.password,
    );
    if (!isPasswordMatch) {
      throw new UnauthorizedException('invalidPassword');
    }

    const token = await this.authService.signToken(user);

    return { user, token };
  }

  async getUser(data: GetUserDto): Promise<UserReponseDto> {
    try {
      await this.authService.verifyToken(data.token);
    } catch (err) {
      throw new UnauthorizedException('invalidToken');
    }

    const user = await this.userDal.findById(data.id);

    return { user, token: data.token };
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Partial<UserReponseDto>> {
    const user = await this.userDal.findByIdAndUpdate(
      new ObjectId(id),
      updateUserDto,
    );

    return { user };
  }

  async deleteUser(id: string): Promise<boolean> {
    const deleteResult = this.userDal.findByIdAndDelete(id);
    if (deleteResult) {
      return true;
    }

    return false;
  }
}
