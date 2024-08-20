import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthenticationGuard } from 'src/_share/guards/authentication-guard.guard';
import { ICreateProjectUseCaseContract } from '../contracts/create-project.use-case.contract';
import { IFindProjectUseCase } from '../contracts/find-project.use-case';
import { CreateProjectDto } from '../dto/create-project.dto';
import { QueryFindUserQueryParamDto } from '../dto/find-project.dto';
import { IDeleteProjectUseCase } from '../contracts/delete-project.use-case';

@ApiTags('Project')
@ApiBearerAuth()
@Controller('project')
@UseGuards(AuthenticationGuard)
export class ProjectController {
  constructor(
    @Inject('CreateProjectUseCase')
    private readonly createProjectUseCase: ICreateProjectUseCaseContract,

    @Inject('FindUserUseCase')
    private readonly findUserUseCase: IFindProjectUseCase,

    @Inject('DeleteProjectUseCase')
    private readonly deleteProject: IDeleteProjectUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  public async create(
    @Req() request: Request,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    const { id } = await this.createProjectUseCase.execute(
      request.user.id,
      createProjectDto,
    );

    return { projectId: id };
  }

  @Get()
  public async find(
    @Req() request: Request,
    @Query() query: QueryFindUserQueryParamDto,
  ) {
    return this.findUserUseCase.execute(
      +query.page,
      +query.limit,
      request.user.id,
    );
  }

  @Delete(':id')
  public async delete(@Req() request: Request, @Param('id') projectId: string) {
    await this.deleteProject.execute(request.user.id, projectId);

    return ['Project deletado'];
  }
}
