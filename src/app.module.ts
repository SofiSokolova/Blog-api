import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, config } from './config/config.module';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    SequelizeModule.forRoot({
      dialect: config.db.dialect,
      host: config.db.host,
      port: config.db.port,
      username: config.db.username,
      password: config.db.password,
      database: config.db.database,
      autoLoadModels: true,
      logging: true,
      sync: {
        alter: true,
      },
    }),
  ],
})
export class AppModule {}
