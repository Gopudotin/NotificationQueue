import { Test, TestingModule } from '@nestjs/testing';
import { SubNotificationController } from './sub-notification.controller';

describe('SubNotificationController', () => {
  let controller: SubNotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubNotificationController],
    }).compile();

    controller = module.get<SubNotificationController>(SubNotificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
