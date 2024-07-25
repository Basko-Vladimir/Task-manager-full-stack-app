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
import { User } from '@prisma/client';

import { CurrentUser } from '../user/decorators/user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';

import { TimerService } from './timer.service';
import { UpdateTimerRoundDto } from './dto/update-timer-round.dto';
import { TimerSessionDto } from './dto/timer-session.dto';

@Controller('timer-session')
@Auth()
export class TimerController {
  constructor(private readonly timerService: TimerService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getTodayTimerSession(@CurrentUser('id') userId: string) {
    return this.timerService.getTodayTimerSession(userId);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTimerSession(
    @Body() timerSessionDto: TimerSessionDto,
    @CurrentUser() user: User
  ) {
    return this.timerService.createTimerSession(timerSessionDto, user);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateTimerSession(
    @Param('id') sessionId: string,
    @Body() timerSessionDto: TimerSessionDto,
    @CurrentUser('id') userId: string
  ) {
    return this.timerService.updateTimerSession(
      timerSessionDto,
      sessionId,
      userId
    );
  }

  @UsePipes(new ValidationPipe())
  @Put('rounds/:id')
  @HttpCode(HttpStatus.OK)
  updateSessionRound(
    @Param('id') roundId: string,
    @Body() updateTimerRoundDto: UpdateTimerRoundDto
  ) {
    return this.timerService.updateSessionRound(updateTimerRoundDto, roundId);
  }

  @Delete(':id')
  remove(@Param('id') sessionId: string, @CurrentUser('id') userId: string) {
    return this.timerService.removeTimerSession(sessionId, userId);
  }
}
