import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  BeforeCreate,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

@Table
export class User extends Model<User> {
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
  @BeforeCreate
  static async generatePasswordHash(user: User) {
    try {
      user.passwordHash = await bcrypt.hash(
        user.passwordHash,
        await bcrypt.genSalt(10),
      );
    } catch (err) {
      console.error(err);
    }
  }
}



/* export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  confirmed: boolean;

  @Prop({ required: true })
  salt: string;
}

export const UserSchema = SchemaFactory.createForClass(User); */



/* export interface User extends Document {
  passwordHash: string;
} */

/* UserSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.passwordHash);
}; */
