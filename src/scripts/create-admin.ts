import { Injectable } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { Role } from '../users/roles/role.enum';

@Injectable()
export class CreateAdminService {

  async createAdmin() {
    const user = new User();
    user.email = 'admin@gmail.com';
    user.passwordHash = 'adminskiy';
    user.role = Role.ADMIN;

    return user.save();
  }
}

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost', //process.env.POSTGRES_HOST,
      port: 5432, //parseInt(process.env.POSTGRES_PORT),
      username: 'postgres', //process.env.POSTGRES_USER,
      password: 'sofipass', //process.env.POSTGRES_PASSWORD,
      database: 'test_pg2', //process.env.POSTGRES_DB,
      models: [User],
      logging: true,
      sync: {
        alter: true,
      },
    }),
  ],
  providers: [CreateAdminService],
})
class AppModule { }

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: true,
  });
  const createAdminService = app.get(CreateAdminService);
  console.log(process.env.POSTGRES_USER);
  await createAdminService.createAdmin();
}
bootstrap();
