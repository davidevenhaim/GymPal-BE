import * as bcrypt from 'bcrypt';

// @@ NestJS
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// @@ Constants
import { HASH_SALT_ROUNDS, SECRET_KEY } from '../common/utils/constants';

@Injectable()
export class AuthenticationService {
  constructor(
    private jwtService: JwtService,
    private secretKey = SECRET_KEY,
  ) {}

  signToken(tokenData: any) {
    return this.jwtService.signAsync({
      ...tokenData,
    });
  }

  verifyToken(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: this.secretKey,
    });
  }

  encryptPassword(password: string) {
    return bcrypt.hash(password, HASH_SALT_ROUNDS);
  }

  decryptPassword(hashedPassword: string) {}

  loginUser() {}
}
