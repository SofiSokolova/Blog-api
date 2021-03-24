import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { AuthService } from '../auth/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: true,
  });
  const authService = app.get(AuthService);
  await authService.createAdmin();
}
bootstrap();
