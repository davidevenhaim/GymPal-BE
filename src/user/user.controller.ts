import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';

// @@ Services
import { UserService } from './user.service';

// @@ Dto's
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { GetUserDto } from './dto/get-user-data.dto';

// @@ Interceptors
import { UserTransformInterceptor } from './interceptors/user-transform.interceptor';

// @@ Guards
import { AuthGuard } from '../common/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UseInterceptors(UserTransformInterceptor)
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }

  @Post('login')
  @UseInterceptors(UserTransformInterceptor)
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.loginUser(loginUserDto);
  }

  @Post('getUser')
  @UseInterceptors(UserTransformInterceptor)
  getUserFromToken(@Body() data: GetUserDto) {
    return this.userService.getUser(data);
  }

  @Patch('update/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(UserTransformInterceptor)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
