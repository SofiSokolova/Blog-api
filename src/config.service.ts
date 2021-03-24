import { Dialect } from 'sequelize/types';

export interface Config {
  dialect: Dialect;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  secretOrKey: string;
  salt: number;
}

export function configFactory(): Config {
  return {
    dialect: process.env.DATABASE_DIALECT as Dialect,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    secretOrKey: process.env.JWT_SECRET,
    salt: parseInt(process.env.SALT, 10),
  };
}
