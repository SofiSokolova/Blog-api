import { Sequelize } from 'sequelize-typescript';
import { RefreshToken } from 'src/auth/refresh-token/refresh-token.entity';
import { User } from '../users/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: parseInt(process.env.DATABASE_HOST),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: 'test_pg',
      });
      sequelize.addModels([User, RefreshToken]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
