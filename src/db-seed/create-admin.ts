import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: true,
  });
  const usersService = app.get(UsersService);
  await usersService.createAdmin();
}
bootstrap();
