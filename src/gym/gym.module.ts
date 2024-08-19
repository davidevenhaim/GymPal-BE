import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// @@ Controllers
import { GymController } from './gym.controller';

// @@ Schemas
import { Gym, GymSchema } from './gym.schema';

// @@ Services
import { GymService } from './gym.service';

// @@ DAL - Data Acess Layer
import { GymDal } from './gym.dal';

// @@ Modules
import { SocketModule } from '../socket/socket.module';
import { AuthenticationModule } from '../authentication/authentication.module';

// @@ Guards
import { AuthGuard } from '../common/guards/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gym.name, schema: GymSchema }]),
    SocketModule,
    AuthenticationModule,
  ],
  controllers: [GymController],
  providers: [GymService, GymDal, AuthGuard],
})
export class GymModule {}
