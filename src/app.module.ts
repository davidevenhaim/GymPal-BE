import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

// @@ Modules
import { WorkoutModule } from './workout/workout.module';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { GymModule } from './gym/gym.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    AuthenticationModule,
    FeedbackModule,
    GymModule,
    MongooseModule.forRoot('mongodb://localhost/nest'),
    UserModule,
    WorkoutModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
