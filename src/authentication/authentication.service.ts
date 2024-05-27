import * as bcrypt from 'bcrypt';

// @@ NestJS
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// @@ Constants
import { HASH_SALT_ROUNDS } from '../common/utils/constants';

@Injectable()
export class AuthenticationService {
  constructor(private readonly jwtService: JwtService) {}

  signToken(tokenData: any) {
    return this.jwtService.signAsync({
      ...tokenData,
    });
  }

  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }

  verifyToken(token: string) {
    return this.jwtService.verifyAsync(token);
  }

  isPasswordMatch(
    userPassword: string,
    givenPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(givenPassword, userPassword);
  }

  encryptPassword(password: string) {
    return bcrypt.hash(password, HASH_SALT_ROUNDS);
  }
}
