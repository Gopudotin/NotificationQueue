// notification/services/notification/notification.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from 'src/notification/notification.entity';
import { SubNotificationService } from '../../../sub-notification/services/sub-notification/sub-notification.service';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification)
    private readonly notificationModel: typeof Notification,
    private readonly subNotificationService: SubNotificationService,
  ) {}

  async findAll(): Promise<Notification[]> {
    return this.notificationModel.findAll();
  }

  async findOne(id: number): Promise<Notification> {
    return this.notificationModel.findByPk(id);
  }

  async create(
    notificationData: Partial<Notification>,
    subscriberIds: number[],
  ): Promise<Notification> {
    const notification = await this.notificationModel.create(notificationData);
    await this.subNotificationService.processNotification(
      notification.id,
      subscriberIds,
    );
    return notification;
  }

  async update(
    id: number,
    notificationData: Partial<Notification>,
  ): Promise<[number, Notification[]]> {
    return this.notificationModel.update(notificationData, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<void> {
    await this.notificationModel.destroy({ where: { id } });
  }
}
