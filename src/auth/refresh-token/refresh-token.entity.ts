import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'refresh_tokens', underscored: true })
export class RefreshToken extends Model<RefreshToken> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
  })
  userId: number;

  @Column
  isRevoked: boolean;

  @Column
  expires: Date;

  @Column
  tokenHash: string;
}
