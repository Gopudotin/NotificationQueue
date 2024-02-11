// notification/services/notification/notification.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from 'src/notification/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification)
    private readonly notificationModel: typeof Notification,
  ) {}

  async findAll(): Promise<Notification[]> {
    return this.notificationModel.findAll();
  }

  async findOne(id: number): Promise<Notification> {
    return this.notificationModel.findByPk(id);
  }

  async create(notificationData: Partial<Notification>): Promise<Notification> {
    return this.notificationModel.create(notificationData);
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
