//   @@ Utils
import { IsMongoId, IsNotEmpty, IsString } from '@nestjs/class-validator';

export class GetUserDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
