import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { verify } from 'argon2';

import { UserService } from '../user/user.service';

import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async login(dto: AuthDto) {
    return dto;
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
    const user = await this.userService.getUserByEmail(dto.email);
    const { password, ...otherProperties } = user;

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const isValid = verify(user.password, dto.password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return otherProperties;
  }
}
