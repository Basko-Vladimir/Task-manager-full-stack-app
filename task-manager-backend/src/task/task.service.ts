import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getAllTasks(userId: string) {
    try {
      return this.prisma.task.findMany({
        where: {
          userId
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  createTask(createDto: CreateTaskDto, userId: string) {
    return this.prisma.task.create({
      data: {
        ...createDto,
        user: {
          connect: {
            id: userId
          }
        }
      }
    });
  }

  updateTask(updateDto: UpdateTaskDto, userId: string, taskId: string) {
    return this.prisma.task.update({
      where: {
        userId,
        id: taskId
      },
      data: updateDto
    });
  }

  removeTask(taskId: string) {
    return this.prisma.task.delete({
      where: {
        id: taskId
      }
    });
  }
}
