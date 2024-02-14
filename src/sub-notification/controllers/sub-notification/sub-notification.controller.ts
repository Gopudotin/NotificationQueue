// src/sub-notification/controllers/sub-notification/sub-notification.controller.ts

import { Controller, Get, Put, Param, ParseIntPipe } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SubscriberNotification } from 'src/sub-notification/sub-notification.entity';
import { SubNotificationService } from 'src/sub-notification/services/sub-notification/sub-notification.service';

@Controller('sub-notification')
export class SubNotificationController {
  constructor(
    @InjectModel(SubscriberNotification)
    private readonly subscriberNotificationModel: typeof SubscriberNotification,
    private readonly subNotificationService: SubNotificationService,
  ) {}

  @Get()
  async getAllNotifications(): Promise<SubscriberNotification[]> {
    return this.subscriberNotificationModel.findAll();
  }

  @Get(':subscriberId/notifications/unread')
  async getUnreadNotifications(
    @Param('subscriberId', ParseIntPipe) subscriberId: number,
  ): Promise<SubscriberNotification[]> {
    return this.subNotificationService.getUnreadNotificationsForSubscriber(
      subscriberId,
    );
  }

  @Put(':notificationId/:subscriberId/read')
  async markNotificationAsRead(
    @Param('notificationId', ParseIntPipe) notificationId: number,
    @Param('subscriberId', ParseIntPipe) subscriberId: number,
  ) {
    await this.subNotificationService.markNotificationAsRead(
      notificationId,
      subscriberId,
    );
    return { message: 'Notification marked as read.' };
  }
}
