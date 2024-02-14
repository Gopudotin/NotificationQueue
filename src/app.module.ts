// app.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TypeModule } from './type/type.module';
import { TemplateModule } from './template/template.module';
import { NotificationModule } from './notification/notification.module';
import { SubscriberModule } from './suscriber/suscriber.module';
import { BullModule } from '@nestjs/bull';
import { SubNotificationModule } from './sub-notification/sub-notification.module';
import { ProcessorsModule } from './processors/processors.module';
import { ProcessorsService } from './processors/services/processors/processors.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'hp15',
      database: 'lanware',
      autoLoadModels: true,
      synchronize: true,
    }),

    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),

    BullModule.registerQueue({
      name: 'notificationQueue',
    }),

    TypeModule,
    TemplateModule,
    NotificationModule,
    SubscriberModule,
    SubNotificationModule,
    ProcessorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
