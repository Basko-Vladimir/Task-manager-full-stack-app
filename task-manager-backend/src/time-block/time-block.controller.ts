import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  Put
} from '@nestjs/common';

import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../user/decorators/user.decorator';

import { TimeBlockService } from './time-block.service';
import { CreateTimeBlockDto } from './dto/create-time-block.dto';
import { UpdateTimeBlockDto } from './dto/update-time-block.dto';

@Controller('time-blocks')
@Auth()
export class TimeBlockController {
  constructor(private readonly timeBlockService: TimeBlockService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllTimeBlocks(@CurrentUser('id') userId: string) {
    return this.timeBlockService.getAllTimeBlocks(userId);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTimeBlock(
    @CurrentUser('id') userId: string,
    @Body() createDto: CreateTimeBlockDto
  ) {
    return this.timeBlockService.createTimeBlock(createDto, userId);
  }

  @UsePipes(new ValidationPipe())
  @Put('update-order')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateTimeBlocksOrder(@Body('ids') ids: string[]) {
    return this.timeBlockService.updateTimeBlocksOrder(ids);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateTimeBlock(
    @Param('id') timeBlockId: string,
    @CurrentUser('id') userId: string,
    @Body() updateDto: UpdateTimeBlockDto
  ) {
    return this.timeBlockService.updateTimeBlock(
      updateDto,
      userId,
      timeBlockId
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTimeBlock(
    @Param('id') timeBlockId: string,
    @CurrentUser('id') userId: string
  ) {
    return this.timeBlockService.removeTimeBlock(userId, timeBlockId);
  }
}
