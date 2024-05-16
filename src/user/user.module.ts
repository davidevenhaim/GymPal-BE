import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from '../schemas/user.schema';

// @@ Utils
import { SECRET_KEY, SECRET_KEY_EXPIRY } from '../common/utils/constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: SECRET_KEY,
      signOptions: { expiresIn: SECRET_KEY_EXPIRY },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
