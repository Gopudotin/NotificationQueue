import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from 'src/notification/notification.entity';
import { NotificationTemplate } from 'src/template/template.entity';

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

  async create(
    notificationData: Partial<Notification>,
    template: NotificationTemplate,
    subscribers: string[],
  ): Promise<Notification> {
    const notificationMessage = this.renderNotificationMessage(
      template.template,
      subscribers,
    );

    const createdNotification = await this.notificationModel.create({
      ...notificationData,
      description: notificationMessage,
    });

    return createdNotification;
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

  private renderNotificationMessage(
    template: string,
    subscribers: string[],
  ): string {
    let message = template;
    subscribers.forEach((subscriber) => {
      message = message.replace('{{name}}', subscriber);
    });
    return message;
  }
}
