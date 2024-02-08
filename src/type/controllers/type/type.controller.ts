import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TypeService } from '../../services/type/type.service';
import { NotificationType } from 'src/type/type.entity';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  findAll(): Promise<NotificationType[]> {
    return this.typeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<NotificationType> {
    return this.typeService.findOne(+id);
  }

  @Post()
  create(@Body() typeData: Partial<NotificationType>): Promise<NotificationType> {
    return this.typeService.create(typeData);
  }

  @Put(':id')
  updateNotificationType(@Param('id') id: number, @Body() updatedData: Partial<NotificationType>) {
    return this.typeService.update(id, updatedData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.typeService.remove(+id);
  }
}
