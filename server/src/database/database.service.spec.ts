import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('DatabaseService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be connected to database', async () => {
    expect(await service.$connect()).toBeUndefined();
  });
});
