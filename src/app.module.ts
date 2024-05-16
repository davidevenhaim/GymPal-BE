import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

// @@ Modules
import { ExerciseModule } from './exercise/exercise.module';
import { WorkoutModule } from './workout/workout.module';
import { UserModule } from './user/user.module';

// @@ Configurtaion
import { configService } from './config/config.service';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
  imports: [
    ExerciseModule,
    WorkoutModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost/nest'),
    // TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware);
  }
}
