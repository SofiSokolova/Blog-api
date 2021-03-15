import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RefreshToken } from './auth/refresh-token/refresh-token.entity';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.DATABASE_HOST),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: 'test_pg',
      models: [User, RefreshToken],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
