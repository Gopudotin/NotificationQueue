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

  async scheduleNotification(notificationId: number, scheduledAt: Date, subscriberIds: number[]): Promise<void> {
    try {
      for (const subscriberId of subscriberIds) {
        console.log(`Scheduling notification with ID ${notificationId} for subscriber ${subscriberId} at ${scheduledAt}`);
        // Here you can implement the logic to schedule the notification for each subscriber
        // For example, you could save the notification information to a database or send it directly to a messaging service
      }
    } catch (error) {
      console.error('Error scheduling notification:', error);
      throw error;
    }
  }

  async processNotification(subscriberId: number, notificationId: number): Promise<void> {
    try {
      console.log(`Processing notification for subscriber ${subscriberId} with ID ${notificationId}`);
      // Here you can implement the logic to process the notification for the subscriber
      // For example, you could mark the notification as read in the database
    } catch (error) {
      console.error(`Error processing notification for subscriber ${subscriberId} with ID ${notificationId}:`, error);
      throw error;
    }
  }
}