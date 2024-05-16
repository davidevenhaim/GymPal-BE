// @@ Nestjs
import { PartialType } from '@nestjs/mapped-types';
import { IsString, MaxLength, MinLength } from '@nestjs/class-validator';

// @@ Typeorm
import { Column } from 'typeorm';

// @@ Dto's
import { CreateUserDto } from './create-user.dto';

// @@ Utils
import { MAX_STRING_LENGTH } from '../../common/utils/constants';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @MinLength(2)
  @MaxLength(MAX_STRING_LENGTH)
  name: string;
}
