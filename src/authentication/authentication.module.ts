import { Module } from '@nestjs/common';

// @@ JWT
import { JwtModule } from '@nestjs/jwt';

// @@ Services
import { AuthenticationService } from './authentication.service';

// @@ Utils
import { SECRET_KEY, SECRET_KEY_EXPIRY } from '../common/utils/constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: SECRET_KEY,
      signOptions: { expiresIn: SECRET_KEY_EXPIRY },
    }),
  ],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
