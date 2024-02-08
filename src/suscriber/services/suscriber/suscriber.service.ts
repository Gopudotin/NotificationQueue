// src/subscriber/services/suscriber/suscriber.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subscriber } from 'src/suscriber/subscriber.entity';

@Injectable()
export class SubscriberService {
  constructor(
    @InjectModel(Subscriber)
    private readonly subscriberModel: typeof Subscriber,
  ) {}

  async findAll(): Promise<Subscriber[]> {
    return this.subscriberModel.findAll();
  }

  async findOne(id: number): Promise<Subscriber> {
    return this.subscriberModel.findByPk(id);
  }

  async create(subscriberData: Partial<Subscriber>): Promise<Subscriber> {
    return this.subscriberModel.create(subscriberData);
  }

  async update(id: number, subscriberData: Partial<Subscriber>): Promise<[number, Subscriber[]]> {
    return this.subscriberModel.update(subscriberData, { where: { id }, returning: true });
  }

  async remove(id: number): Promise<void> {
    await this.subscriberModel.destroy({ where: { id } });
  }
}
