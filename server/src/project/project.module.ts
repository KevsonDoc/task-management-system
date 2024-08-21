import { Module } from '@nestjs/common';
import { ProjectController } from './controllers/project.controller';
import { projectProvider } from './project.provider';
import { DatabaseModule } from 'src/database/database.module';
import { AuthenticationModule } from 'src/authentication/authentication.module';

@Module({
  imports: [DatabaseModule, AuthenticationModule],
  exports: ['ProjectRepository'],
  controllers: [ProjectController],
  providers: [...projectProvider],
})
export class ProjectModule {}
