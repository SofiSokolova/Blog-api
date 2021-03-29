import { Module } from '@nestjs/common';
import { Dialect } from 'sequelize/types';
import 'dotenv/config';
import { CONFIG } from '../inject-tokens';

export interface Config {
  db: {
    dialect: Dialect;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  auth: {
    secretKey: string;
    salt: number;
  };
  redis: {
    redisHost: string;
    redisPort: number;
  };
  createAdmin: {
    adminName: string;
    adminPassword: string;
  };
}

export const config: Config = {
  db: {
    dialect: process.env.DATABASE_DIALECT as Dialect,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  auth: {
    secretKey: process.env.JWT_SECRET,
    salt: parseInt(process.env.SALT, 10),
  },
  redis: {
    redisHost: process.env.REDIS_HOST,
    redisPort: parseInt(process.env.REDIS_PORT, 10),
  },
  createAdmin: {
    adminName: process.env.CREATE_ADMIN_EMAIL,
    adminPassword: process.env.CREATE_ADMIN_PASSWORD,
  },
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
