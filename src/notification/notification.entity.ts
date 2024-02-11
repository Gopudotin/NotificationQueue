import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'notification' })
export class Notification extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.JSONB,
  })
  payload?: object;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'schedule_date',
  })
  schedule_date: Date;

  @Column({
    type: DataType.TIME,
    allowNull: false,
    field: 'scheduled_time',
  })
  scheduled_time: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
    field: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
    field: 'updated_at',
  })
  updatedAt: Date;
}
