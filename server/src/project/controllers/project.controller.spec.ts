import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from './project.controller';
import { CreateProjectUseCase } from '../use-case/create-project.use-case';

describe('ProjectController', () => {
  let controller: ProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [CreateProjectUseCase],
    }).compile();

    controller = module.get<ProjectController>(ProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
