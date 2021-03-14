import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { RefreshToken } from './auth/refresh-token/refresh-token.entity';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    AuthModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'sofipass',
      database: 'test_pg',
      models: [User, RefreshToken],
    }),
   // MongooseModule.forRoot('mongodb://localhost:27017/blog-db'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
