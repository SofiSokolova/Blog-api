import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { configFactory } from './config.service';

const config = configFactory();

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      autoLoadModels: true,
      logging: true,
      sync: {
        alter: true,
      },
    }),
  ],
  providers: [
    {
      provide: 'config',
      useValue: config,
    },
  ],
})
export class AppModule {}
