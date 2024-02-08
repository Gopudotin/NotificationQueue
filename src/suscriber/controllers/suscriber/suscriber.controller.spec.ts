import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Subscriber } from 'src/suscriber/subscriber.entity';
import { SubscriberService } from 'src/suscriber/services/suscriber/suscriber.service';

@Controller('subscriber')
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @Get()
  findAll(): Promise<Subscriber[]> {
    return this.subscriberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Subscriber> {
    return this.subscriberService.findOne(+id);
  }

  @Post()
  create(@Body() subscriberData: Partial<Subscriber>): Promise<Subscriber> {
    return this.subscriberService.create(subscriberData);
  }

  @Put(':id')
  updateSubscriber(@Param('id') id: number, @Body() updatedData: Partial<Subscriber>): Promise<[number, Subscriber[]]> {
    return this.subscriberService.update(id, updatedData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.subscriberService.remove(+id);
  }
}