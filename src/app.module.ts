import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

// @@ Modules
import { ExerciseModule } from './exercise/exercise.module';
import { WorkoutModule } from './workout/workout.module';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';

// @@ Configurtaion
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
  imports: [
    ExerciseModule,
    UserModule,
    WorkoutModule,
    MongooseModule.forRoot('mongodb://localhost/nest'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware);
  }
}
