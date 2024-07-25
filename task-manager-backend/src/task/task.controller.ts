import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';

import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../user/decorators/user.decorator';

import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Auth()
  findAll(@CurrentUser('id') userId: string) {
    return this.taskService.getAllTasks(userId);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Auth()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser('id') userId: string
  ) {
    return this.taskService.createTask(createTaskDto, userId);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth()
  update(
    @Param('id') taskId: string,
    @CurrentUser('id') userId: string,
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    return this.taskService.updateTask(updateTaskDto, userId, taskId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth()
  remove(@Param('id') taskId: string) {
    return this.taskService.removeTask(taskId);
  }
}
