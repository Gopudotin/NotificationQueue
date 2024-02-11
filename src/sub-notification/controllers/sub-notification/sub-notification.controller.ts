// src/sub-notification/controllers/sub-notification/sub-notification.controller.ts

import { Controller, Get, Put, Param, ParseIntPipe } from '@nestjs/common'; // Import ParseIntPipe
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
    @Param('subscriberId', ParseIntPipe) subscriberId: number, // Use ParseIntPipe to convert params to numbers
    @Param('notificationId', ParseIntPipe) notificationId: number, // Use ParseIntPipe to convert params to numbers
  ) {
    await this.subNotificationService.processNotification(
      notificationId, // Pass notificationId as a single number
      [subscriberId], // Pass subscriberId as an array
    );
    return { message: 'Notification marked as read.' };
  }
}
