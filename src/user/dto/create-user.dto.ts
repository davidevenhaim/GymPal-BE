import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from '@nestjs/class-validator';
import { Column } from 'typeorm';

//   @@ Utils
import { MAX_STRING_LENGTH } from '../../common/utils/constants';

export class CreateUserDto {
  @Column({ type: 'varchar', unique: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(MAX_STRING_LENGTH)
  username: string;

  @Column({ type: 'varchar' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(MAX_STRING_LENGTH)
  name: string;

  @Column({ type: 'varchar', nullable: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(MAX_STRING_LENGTH)
  password: string;
}
