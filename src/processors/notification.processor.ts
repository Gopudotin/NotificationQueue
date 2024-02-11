import { Processor, Process, OnQueueCompleted } from '@nestjs/bull';
import { Job } from 'bull';
import { SubNotificationService } from 'src/sub-notification/services/sub-notification/sub-notification.service';

@Processor('notificationQueue')
export class NotificationProcessor {
  constructor(
    private readonly subNotificationService: SubNotificationService,
  ) {}

  @Process('processNotification')
  async processNotificationJob(
    job: Job<{ notificationId: number; subscriberIds: number[] }>,
  ): Promise<void> {
    const { notificationId, subscriberIds } = job.data;

    try {
      await this.subNotificationService.processNotification(
        notificationId,
        subscriberIds,
      );
    } catch (error) {
      console.error(
        `Error processing notification job for ID ${notificationId}:`,
        error.message,
      );
    }
  }
}
