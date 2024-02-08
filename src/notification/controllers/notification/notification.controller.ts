// notification/controllers/notification/notification.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Notification } from 'src/notification/notification.entity';
import { NotificationService } from '../../services/notification/notification.service';
import { SubNotificationService } from '../../../sub-notification/services/sub-notification/sub-notification.service'; 

// Define interface for payload object
interface Payload {
  name: string;
}

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly subNotificationService: SubNotificationService 
  ) {}

  @Post()
  async create(@Body() notificationData: { scheduled_at: Date, title: string, description: string, payload: Payload, subscriberIds: number[] }): Promise<Notification> {
    const { scheduled_at, subscriberIds, ...restData } = notificationData;

    // Combine description with payload value
    const notificationMessage = `${notificationData.description} ${notificationData.payload.name}`;

    const createdNotification = await this.notificationService.create({ ...restData, description: notificationMessage });

    if (scheduled_at) {
      await this.subNotificationService.scheduleNotification(createdNotification.id, scheduled_at, subscriberIds);
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
  updateNotification(@Param('id') id: number, @Body() updatedData: Partial<Notification>): Promise<[number, Notification[]]> {
    return this.notificationService.update(id, updatedData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.notificationService.remove(+id);
  }
}
