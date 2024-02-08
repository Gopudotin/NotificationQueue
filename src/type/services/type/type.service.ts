// type/services/type/type.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NotificationType } from 'src/type/type.entity';

@Injectable()
export class TypeService {
  constructor(
    @InjectModel(NotificationType)
    private readonly typeModel: typeof NotificationType,
  ) {}

  async findAll(): Promise<NotificationType[]> {
    return this.typeModel.findAll();
  }

  async findOne(id: number): Promise<NotificationType> {
    return this.typeModel.findByPk(id);
  }

  async create(typeData: Partial<NotificationType>): Promise<NotificationType> {
    return this.typeModel.create(typeData);
  }

  async update(id: number, typeData: Partial<NotificationType>): Promise<[number, NotificationType[]]> {
    const [affectedCount, updatedRows] = await this.typeModel.update(typeData, { where: { id }, returning: true });
    return [affectedCount, updatedRows];
  }

  async remove(id: number): Promise<void> {
    await this.typeModel.destroy({ where: { id } });
  }
}
