import { Role } from '../../users/roles/role.enum';
import { QueryInterface } from 'sequelize';
import { DataType } from 'sequelize-typescript';

export default {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable('Users', {
      id: {
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataType.STRING,
        allowNull: false,
        unique: true,
      },
      passwordHash: {
        type: DataType.STRING,
        allowNull: false,
      },
      role: {
        type: DataType.ENUM({ values: Object.values(Role) }),
        defaultValue: Role.USER,
      },
      confirmed: {
        type: DataType.BOOLEAN,
        defaultValue: false,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('Users');
  },
};
