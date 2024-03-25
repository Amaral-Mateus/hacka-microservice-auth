import { Model, PrimaryKey } from 'sequelize-typescript';
import { Column, Table, DataType } from 'sequelize-typescript';

export type ListAttributes = {
  nick_name: string;
  email?: string;
  password: string;
};

@Table({ tableName: 'users' })
export class UserModel extends Model<ListAttributes> {
  @Column({
    type: DataType.INTEGER,
  })
  id: number;
  @PrimaryKey
  @Column
  nick_name: string;
  @Column
  email: string | null;
  @Column
  password: string;
}