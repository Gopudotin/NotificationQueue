import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { Subscriber } from 'src/suscriber/subscriber.entity';
import { Notification } from 'src/notification/notification.entity';

@Table({
  tableName: 'subscribernotification',
})
export class SubscriberNotification extends Model<SubscriberNotification> {
  @Column({ field: 'has_read', allowNull: false, defaultValue: false })
  hasRead: boolean;

  @ForeignKey(() => Subscriber)
  @Column({ field: 'subscriber_id' })
  subscriberId: number;

  @ForeignKey(() => Notification)
  @Column({ field: 'notification_id' })
  notificationId: number;

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

  // Define associations
  @BelongsTo(() => Subscriber)
  subscriber: Subscriber;

  @BelongsTo(() => Notification)
  notification: Notification;
}