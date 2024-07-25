import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

import { TimerService } from './timer.service';
import { TimerController } from './timer.controller';

@Module({
  controllers: [TimerController],
  providers: [TimerService, PrismaService],
  exports: [TimerService]
})
export class TimerModule {}
