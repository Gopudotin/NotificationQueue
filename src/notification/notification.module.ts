// notification/notification.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Notification } from './notification.entity';
import { NotificationService } from './services/notification/notification.service';
import { NotificationController } from './controllers/notification/notification.controller';
import { SubNotificationModule } from 'src/sub-notification/sub-notification.module';

@Module({
  imports: [SequelizeModule.forFeature([Notification]), SubNotificationModule],
  providers: [NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule {}
