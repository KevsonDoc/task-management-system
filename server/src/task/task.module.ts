import { Module } from '@nestjs/common';
import { TaskController } from './controllers/task.controller';
import { taskProvider } from './task.provider';
import { ProjectModule } from 'src/project/project.module';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [ProjectModule, DatabaseModule, UserModule],
  controllers: [TaskController],
  providers: [...taskProvider],
})
export class TaskModule {}
