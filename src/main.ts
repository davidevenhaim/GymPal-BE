import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// @@ Interceptors
import { LoggerInterceptor } from './common/interceptor/logging.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3000);
}
bootstrap();
