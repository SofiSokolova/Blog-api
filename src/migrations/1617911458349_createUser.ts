import { Role } from '../users/roles/role.enum';

export default {
  async up(queryInterface: any, Sequelize: any) {
    return queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      passwordHash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM({ values: Object.values(Role) }),
        defaultValue: Role.USER,
      },
      confirmed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
  },

  async down(queryInterface: any, Sequelize: any) {
    return queryInterface.dropTable('Users');
  },
};
