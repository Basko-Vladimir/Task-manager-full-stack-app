import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';

import { Auth } from '../auth/decorators/auth.decorator';

import { UserService } from './user.service';
import { CurrentUser } from './decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user-profile')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth()
  @HttpCode(HttpStatus.OK)
  async getUserProfile(@CurrentUser('id') id: string) {
    return this.userService.getUserProfile(id);
  }

  @UsePipes(new ValidationPipe())
  @Put()
  @HttpCode(HttpStatus.OK)
  @Auth()
  async updateUserProfile(
    @CurrentUser('id') id: string,
    @Body() dto: UpdateUserDto
  ) {
    return this.userService.updateUserProfile(id, dto);
  }
}
