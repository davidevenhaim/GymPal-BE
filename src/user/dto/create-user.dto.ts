import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from '@nestjs/class-validator';
import { Prop } from '@nestjs/mongoose';

//   @@ Utils
import {
  MAX_STRING_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_STRING_LENGTH,
} from '../../common/utils/constants';

export class CreateUserDto {
  @Prop({ type: 'string', unique: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(MAX_STRING_LENGTH)
  username: string;

  @Prop({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  @MinLength(MIN_STRING_LENGTH)
  @MaxLength(MAX_STRING_LENGTH)
  name: string;

  @Prop({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  @MinLength(MIN_PASSWORD_LENGTH)
  @MaxLength(MAX_STRING_LENGTH)
  password: string;
}
