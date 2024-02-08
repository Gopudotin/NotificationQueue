import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'notificationtemplate' })
export class NotificationTemplate extends Model {
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
  template: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  notification_type: number;

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
