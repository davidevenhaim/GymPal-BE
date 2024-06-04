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

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gym.name, schema: GymSchema }]),
    SocketModule,
  ],
  controllers: [GymController],
  providers: [GymService, GymDal],
})
export class GymModule {}
