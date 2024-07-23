import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { verify } from 'argon2';
import { User } from '@prisma/client';

import { UserService } from '../user/user.service';

import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async login(dto: AuthDto) {
    const user: any = await this.validateUser(dto);
    const tokens = this.generateTokens(user.id);

    return {
      user,
      ...tokens
    };
  }

  async register(dto: AuthDto) {
    const user = await this.userService.getUserByEmail(dto.email);

    if (user) {
      throw new BadRequestException('User is already exists');
    }

    const { password, id, ...otherProperties } =
      await this.userService.createUser(dto);
    const tokens = this.generateTokens(id);

    return {
      id,
      ...otherProperties,
      ...tokens
    };
  }

  private generateTokens(userId: string) {
    const data = { id: userId };

    const accessToken = this.jwtService.sign(data, {
      expiresIn: '1h'
    } as JwtSignOptions);

    const refreshToken = this.jwtService.sign(data, {
      expiresIn: '7d'
    } as JwtSignOptions);

    return { accessToken, refreshToken };
  }

  private async validateUser(dto: AuthDto) {
    const user: User | null = await this.userService.getUserByEmail(dto.email);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const { password, ...otherProperties } = user;
    const isValid = verify(user.password, dto.password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return otherProperties;
  }
}
