// processors.module.ts
import { Module } from '@nestjs/common';
import { ProcessorsService } from './services/processors/processors.service';
import { ProcessorsController } from './controllers/processors/processors.controller';
import { SubNotificationModule } from 'src/sub-notification/sub-notification.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  providers: [ProcessorsService],
  controllers: [ProcessorsController],
  imports:[SubNotificationModule,NotificationModule]
})
export class ProcessorsModule {}
