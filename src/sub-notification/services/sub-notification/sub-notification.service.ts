// sub-notification/services/sub-notification/sub-notification.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SubscriberNotification } from 'src/sub-notification/sub-notification.entity';

@Injectable()
export class SubNotificationService {
  constructor(
    @InjectModel(SubscriberNotification)
    private readonly subscriberNotificationModel: typeof SubscriberNotification,
  ) {}

  async create(
    data: Partial<SubscriberNotification>,
  ): Promise<SubscriberNotification> {
    return this.subscriberNotificationModel.create(data);
  }

  async processNotification(
    notificationId: number,
    subscriberIds: number[],
  ): Promise<void> {
    try {
      for (const subscriberId of subscriberIds) {
        await this.create({ notificationId, subscriberId, hasRead: false });
      }
    } catch (error) {
      console.error('Error processing notification:', error);
      throw error;
    }
  }
}
