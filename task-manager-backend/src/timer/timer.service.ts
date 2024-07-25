import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '../prisma.service';

import { TimerSessionDto } from './dto/timer-session.dto';
import { UpdateTimerRoundDto } from './dto/update-timer-round.dto';

@Injectable()
export class TimerService {
  constructor(private prisma: PrismaService) {}

  // In our case the session = 1 day, that's why name is todaySession
  async getTodayTimerSession(userId: string) {
    const today = new Date().toISOString().split('T')[0];

    return this.prisma.timerSession.findFirst({
      where: {
        createdAt: {
          gte: new Date(today)
        },
        userId
      },
      include: {
        rounds: {
          orderBy: {
            id: 'asc'
          }
        }
      }
    });
  }

  async createTimerSession(timerSessionDto: TimerSessionDto, user: User) {
    const currentSession = await this.getTodayTimerSession(user.id);

    if (currentSession) {
      return currentSession;
    }

    return this.prisma.timerSession.create({
      data: {
        rounds: {
          createMany: {
            data: Array.from({ length: user.intervalsCount }, () => ({
              currentTimeInSeconds: 0
            }))
          }
        },
        user: {
          connect: {
            id: user.id
          }
        }
      },
      include: {
        rounds: true
      }
    });
  }

  async updateTimerSession(
    dto: TimerSessionDto,
    sessionId: string,
    userId: string
  ) {
    return this.prisma.timerSession.update({
      where: {
        userId,
        id: sessionId
      },
      data: dto
    });
  }

  updateSessionRound(dto: UpdateTimerRoundDto, roundId: string) {
    return this.prisma.timerRound.update({
      where: {
        id: roundId
      },
      data: dto
    });
  }

  removeTimerSession(timerSessionId: string, userId: string) {
    return this.prisma.timerSession.delete({
      where: {
        id: timerSessionId,
        userId
      }
    });
  }
}
