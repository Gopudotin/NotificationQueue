// notification/controllers/notification/notification.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Notification } from 'src/notification/notification.entity';
import { NotificationService } from '../../services/notification/notification.service';
import { SubNotificationService } from '../../../sub-notification/services/sub-notification/sub-notification.service';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly subNotificationService: SubNotificationService,
  ) {}

  @Post()
  async create(
    @Body()
    notificationData: {
      schedule_date: string; // Change this to string
      scheduled_time: string;
      title: string;
      description: string;
      payload?: { name: string };
      subscriberIds: number[];
    },
  ): Promise<Notification> {
    const {
      schedule_date,
      scheduled_time,
      subscriberIds,
      payload,
      ...restData
    } = notificationData;

    // Combine description with payload value if payload exists
    let notificationMessage = notificationData.description;
    if (payload && payload.name) {
      notificationMessage += ` ${payload.name}`;
    }

    // Create the notification
    const createdNotification = await this.notificationService.create({
      ...restData,
      description: notificationMessage,
      schedule_date: new Date(schedule_date), // Convert to Date object
      scheduled_time: scheduled_time,
    });

    // Create entries in the subscriberNotification table
    for (const subscriberId of subscriberIds) {
      await this.subNotificationService.create({
        notificationId: createdNotification.id,
        subscriberId: subscriberId,
        hasRead: false, // Set hasRead to false by default
      });
    }

    return createdNotification;
  }

  @Get()
  findAll(): Promise<Notification[]> {
    return this.notificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Notification> {
    return this.notificationService.findOne(+id);
  }

  @Put(':id')
  updateNotification(
    @Param('id') id: number,
    @Body() updatedData: Partial<Notification>,
  ): Promise<[number, Notification[]]> {
    return this.notificationService.update(id, updatedData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.notificationService.remove(+id);
  }
}
