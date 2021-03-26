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

@Table
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
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

  @Column({
    type: DataType.STRING, //TODO DataType.ENUM({ values: Object.values(Role) })
    defaultValue: Role.USER,
  })
  role: Role;

  @BeforeCreate
  static async generatePasswordHash(user: User) {
    user.passwordHash = await bcrypt.hash(
      user.passwordHash,
      await bcrypt.genSalt(config.salt),
    );
  }
}
