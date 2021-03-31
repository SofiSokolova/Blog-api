import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { Role } from '../roles/role.enum';
import { config } from '../../config/config.module';
import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { Query } from '@nestjs/common';


@Table
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  passwordHash: string;

/*   @ApiQuery({ name: 'role', enum: Role })
  async filterByRole(@Query('role') role: Role = Role.USER) {} */

  @Column({
    type: DataType.STRING, //TODO DataType.ENUM({ values: Object.values(Role) })
    defaultValue: Role.USER,
  })
  role: Role;

  @BeforeCreate
  static async generatePasswordHash(user: User) {
    user.passwordHash = await bcrypt.hash(
      user.passwordHash,
      await bcrypt.genSalt(config.auth.salt),
    );
  }
}
