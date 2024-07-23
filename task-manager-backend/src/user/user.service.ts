import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'argon2';
import { startOfDay, subDays } from 'date-fns';

import { PrismaService } from '../prisma.service';
import { AuthDto } from '../auth/dto/auth.dto';

import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUserById(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      include: { tasks: true }
    });
  }

  async getUserProfile(userId: string) {
    const user = await this.getUserById(userId);

    const totalTasks = user.tasks.length;
    const completedTasks = await this.prismaService.task.count({
      where: {
        userId,
        isCompleted: true
      }
    });

    const todayStart = startOfDay(new Date());
    const weekStart = startOfDay(subDays(new Date(), 7));

    const todayTasks = await this.prismaService.task.count({
      where: {
        userId,
        createdAt: {
          gte: todayStart.toISOString()
        }
      }
    });
    const weekTasks = await this.prismaService.task.count({
      where: {
        userId,
        createdAt: {
          gte: weekStart.toISOString()
        }
      }
    });

    const { password, ...userData } = user;

    return {
      user: userData,
      statistics: [
        { label: 'Total', value: totalTasks },
        { label: 'Completed Tasks', value: completedTasks },
        { label: 'Today Tasks', value: todayTasks },
        { label: 'Week Tasks', value: weekTasks }
      ]
    };
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { email }
    });
  }

  async createUser(dto: AuthDto): Promise<User> {
    const data = {
      email: dto.email,
      name: '',
      password: await hash(dto.password)
    };

    return this.prismaService.user.create({ data });
  }

  async updateUserProfile(userId: string, dto: UpdateUserDto) {
    let data = { ...dto };

    if (data.password) {
      data = { ...data, password: await hash(data.password) };
    }

    return this.prismaService.user.update({
      where: {
        id: userId
      },
      data,
      select: {
        id: true,
        name: true,
        email: true
      }
    });
  }
}
