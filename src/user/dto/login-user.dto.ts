//   @@ Utils
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from '@nestjs/class-validator';
import { MAX_STRING_LENGTH } from '../../common/utils/constants';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(MAX_STRING_LENGTH)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(MAX_STRING_LENGTH)
  password: string;
}
