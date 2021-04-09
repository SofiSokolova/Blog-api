import { QueryInterface, QueryOptions, Sequelize } from 'sequelize';
import { Role } from '../../users/roles/role.enum';
import { User } from '../../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { config } from '../../config/config.module';
import { DataType } from 'sequelize-typescript';

export default {
  async up(queryInterface: QueryInterface, sequelize: Sequelize) {

    const admin = [
      {
        email: 'admin1example@google.com',
        passwordHash: 'passExample01',
        role: Role.ADMIN,
        confirmed: true,
      },
    ];
    const createAdmins = await Promise.all(
      await admin.map(async (admin) => {
        const passwordHash = await bcrypt.hash(
          admin.passwordHash,
          await bcrypt.genSalt(config.auth.salt),
        );
        return {
          ...admin,
          passwordHash,
        };
      }),
    );
    await queryInterface.bulkInsert('Users', createAdmins);
  },
  async down(queryInterface: QueryInterface, sequelize: Sequelize) {
    return queryInterface.bulkDelete('Users', {
      email: 'admin1example@google.com',
    });
  },
};
