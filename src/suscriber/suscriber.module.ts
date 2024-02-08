// src/subscriber/subscriber.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subscriber } from './subscriber.entity';
import { SubscriberController } from './controllers/suscriber/suscriber.controller';
import { SubscriberService } from './services/suscriber/suscriber.service';

@Module({
  imports: [SequelizeModule.forFeature([Subscriber])],
  controllers: [SubscriberController],
  providers: [SubscriberService],
})
export class SubscriberModule {}