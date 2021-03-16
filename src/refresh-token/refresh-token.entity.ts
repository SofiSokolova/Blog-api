import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'refresh_tokens', underscored: false })
export class RefreshToken extends Model {
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
