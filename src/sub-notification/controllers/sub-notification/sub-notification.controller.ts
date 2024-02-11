// sub-notification/controllers/sub-notification/sub-notification.controller.ts

import { Controller, Get, Put, Param } from '@nestjs/common';
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

  // New endpoint to update has_read status
  @Put(':subscriberId/:notificationId/read')
  async markNotificationAsRead(
    @Param('subscriberId') subscriberId: string,
    @Param('notificationId') notificationId: string,
  ) {
    const parsedSubscriberId = parseInt(subscriberId, 10);
    const parsedNotificationId = parseInt(notificationId, 10);

    await this.subNotificationService.processNotification(
      parsedSubscriberId,
      parsedNotificationId,
    );
    return { message: 'Notification marked as read.' };
  }
}
