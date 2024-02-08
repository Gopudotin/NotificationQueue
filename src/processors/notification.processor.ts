import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { SubNotificationService } from 'src/sub-notification/services/sub-notification/sub-notification.service';
import { NotificationService } from 'src/notification/services/notification/notification.service';

@Processor('notificationQueue')
export class NotificationProcessor {
  constructor(
    // private readonly subNotificationService: SubNotificationService,
    // private readonly notificationService: NotificationService,
  ) {}

  @Process()
  async processNotificationJob(job: Job<{ subscriberId: number; notificationId: number }>): Promise<void> {
    const { subscriberId, notificationId } = job.data;

    try {
      // await this.subNotificationService.processNotification(subscriberId, notificationId);
    } catch (error) {
      console.error(`Error processing notification job for ID ${notificationId}:`, error.message);
    }
  }
}