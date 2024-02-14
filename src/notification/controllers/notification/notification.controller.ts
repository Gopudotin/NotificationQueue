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
import { NotificationTemplate } from 'src/template/template.entity';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async create(
    @Body()
    notificationData: {
      title: string;
      description: string;
      payload?: { name: string };
      subscriberIds: number[];
      template: NotificationTemplate;
      subscribers: string[];
      schedule_date?: Date;
      scheduled_time?: string;
    },
  ): Promise<Notification> {
    if (notificationData.schedule_date && notificationData.scheduled_time) {
      // Handle scheduled notification
      // Store in Redis and process with BullMQ
    } else {
      // Handle instant notification
      const createdNotification = await this.notificationService.create(
        notificationData,
        notificationData.template,
        notificationData.subscribers,
      );
      return createdNotification;
    }
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
