import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, config } from './config/config.module';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
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
})
export class AppModule {}
