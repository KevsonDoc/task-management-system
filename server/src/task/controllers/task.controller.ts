import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { ICreateTaskUseCasContract } from '../contracts/create-task-use-case.contract';
import { CreateTaskDto } from '../dto/create-task.dto';
import { FindTaskDto } from '../dto/find-task.dto';
import { IFindTaskUseCase } from '../contracts/find-task-use-case.contract';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { IUpdateTaskUseCaseContract } from '../contracts/update-task-use-case.contract';
import { IFindTaskByIdUseCase } from '../contracts/find-task-by-id-use-case.contract';
import { AuthenticationGuard } from 'src/_share/guards/authentication-guard.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ShareTaskDto } from '../dto/share-task.dto';
import { IShareTaskUseCase } from '../contracts/share-task.use-case';

@ApiTags('Task')
@ApiBearerAuth()
@Controller('project/:projectId/task')
@UseGuards(AuthenticationGuard)
export class TaskController {
  constructor(
    @Inject('FindTaskUseCase')
    private readonly findTaskUseCase: IFindTaskUseCase,

    @Inject('CreateTaskUseCase')
    private readonly createTaskUseCase: ICreateTaskUseCasContract,

    @Inject('UpdateTaskUseCase')
    private readonly updateTaskUseCase: IUpdateTaskUseCaseContract,

    @Inject('FindTaskByIdUseCase')
    private readonly findTaskByIdUseCase: IFindTaskByIdUseCase,

    @Inject('ShareTaskUseCase')
    private readonly shareTaskUseCase: IShareTaskUseCase,
  ) {}

  @Post()
  public async create(
    @Req() request: Request,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    await this.createTaskUseCase.execute(request.user.id, createTaskDto);
    return ['Tarefa criada'];
  }

  @Get()
  public async find(
    @Req() request: Request,
    @Param('projectId') projectId: string,
    @Query() findTaskDto: FindTaskDto,
  ) {
    return this.findTaskUseCase.execute({
      ...findTaskDto,
      projectId,
      userId: request.user.id,
    });
  }

  @Get(':id')
  public async findOne(@Req() request: Request, @Param(':id') taskId: string) {
    return this.findTaskByIdUseCase.execute({
      taskId,
      userId: request.user.id,
    });
  }

  @Put(':id')
  public async update(
    @Req() request: Request,
    @Param('id') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    await this.updateTaskUseCase.execute(
      request.user.id,
      taskId,
      updateTaskDto,
    );
    return ['Tarefa foi atualizada.'];
  }

  @Post(':id/share')
  public async share(
    @Req() request: Request,
    @Param('id') taskId: string,
    shareTaskDto: ShareTaskDto,
  ) {
    await this.shareTaskUseCase.execute(request.user.id, taskId, shareTaskDto);
    return ['Tarefa compartilhada com sucesso'];
  }
}
