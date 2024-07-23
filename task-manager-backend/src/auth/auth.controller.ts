import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { Response, Request } from 'express';

import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const { refreshToken, ...response } = await this.authService.login(dto);

    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { refreshToken, ...response } = await this.authService.register(dto);

    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    await this.authService.removeRefreshTokenFromResponse(res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-tokens')
  async getNewTokens(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    const refreshToken =
      request.cookies[this.authService.REFRESH_TOKEN_COOKIE_NAME];

    if (!refreshToken) {
      this.authService.removeRefreshTokenFromResponse(response);
      throw new UnauthorizedException(`Refresh token isn't passed`);
    }

    const { refreshToken: newRefreshToken, ...userData } =
      await this.authService.getNewTokens(refreshToken);

    this.authService.addRefreshTokenToResponse(response, newRefreshToken);

    return userData;
  }
}
