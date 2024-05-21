import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';

// @@ DAL - Data Acess Layer
import { UserDal } from './user.dal';

// @@ Modules
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthenticationModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserDal],
})
export class UserModule {}
