// type/type.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotificationType } from './type.entity';
import { TypeController } from './controllers/type/type.controller';
import { TypeService } from './services/type/type.service';

@Module({
  imports: [SequelizeModule.forFeature([NotificationType])],
  controllers: [TypeController],
  providers: [TypeService],
})
export class TypeModule {}
