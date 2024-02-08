import { Test, TestingModule } from '@nestjs/testing';
import { SubNotificationService } from './sub-notification.service';

describe('SubNotificationService', () => {
  let service: SubNotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubNotificationService],
    }).compile();

    service = module.get<SubNotificationService>(SubNotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
