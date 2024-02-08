import { Test, TestingModule } from '@nestjs/testing';
import { SubscriberService } from './suscriber.service';

describe('SuscriberService', () => {
  let service: SubscriberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscriberService],
    }).compile();

    service = module.get<SubscriberService>(SubscriberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});