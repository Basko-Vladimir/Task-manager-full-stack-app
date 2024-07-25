import { Injectable } from '@nestjs/common';
import { TimeBlock } from '@prisma/client';

import { PrismaService } from '../prisma.service';

import { CreateTimeBlockDto } from './dto/create-time-block.dto';
import { UpdateTimeBlockDto } from './dto/update-time-block.dto';

@Injectable()
export class TimeBlockService {
  constructor(private prisma: PrismaService) {}

  getAllTimeBlocks(userId: string) {
    return this.prisma.timeBlock.findMany({
      where: {
        userId
      },
      orderBy: {
        order: 'asc' as any // Later need to investigate types issue
      }
    });
  }

  createTimeBlock(createDto: CreateTimeBlockDto, userId: string) {
    return this.prisma.timeBlock.create({
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

  updateTimeBlock(
    updateDto: UpdateTimeBlockDto,
    userId: string,
    timeBlockId: string
  ) {
    return this.prisma.timeBlock.update({
      where: {
        userId,
        id: timeBlockId
      },
      data: updateDto
    });
  }

  updateTimeBlocksOrder(ids: string[]) {
    console.info(ids);

    return this.prisma.$transaction(
      ids.map((id, order) =>
        this.prisma.timeBlock.update({
          where: { id },
          data: { order }
        })
      )
    );
  }

  removeTimeBlock(userId: string, timeBlockId: string) {
    return this.prisma.timeBlock.delete({
      where: {
        userId,
        id: timeBlockId
      }
    });
  }
}
