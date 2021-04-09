import { QueryInterface, Sequelize } from 'sequelize';
import { Role } from '../../users/roles/role.enum';

export default {
  async up(queryInterface: QueryInterface, sequelize: Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'admin1example@google.com',
        passwordHash: 'passExample01',
        role: Role.ADMIN,
        confirmed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface: QueryInterface, sequelize: Sequelize) {
    return queryInterface.bulkDelete('Users', {
      email: 'admin1example@google.com',
    });
  },
};
