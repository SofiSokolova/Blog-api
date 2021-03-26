import { Module } from '@nestjs/common';
import { Dialect } from 'sequelize/types';
import 'dotenv/config';
import { CONFIG } from '../../constants';

export interface Config {
  dialect: Dialect;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  secretOrKey: string;
  salt: number;
  redisHost: string;
  redisPort: number;
  adminName: string;
  adminPassword: string;
}

export const config: Config = {
  dialect: process.env.DATABASE_DIALECT as Dialect,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  secretOrKey: process.env.JWT_SECRET,
  salt: parseInt(process.env.SALT, 10),
  redisHost: process.env.REDIS_HOST,
  redisPort: parseInt(process.env.REDIS_PORT, 10),
  adminName: process.env.CREATE_ADMIN_EMAIL,
  adminPassword: process.env.CREATE_ADMIN_PASSWORD,
};

const configProvider = {
  provide: CONFIG,
  useValue: config,
};

@Module({
  providers: [configProvider],
  exports: [configProvider],
})
export class ConfigModule {}
