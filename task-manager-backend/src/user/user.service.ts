import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'argon2';

import { PrismaService } from '../prisma.service';
import { AuthDto } from '../auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUserById(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      include: { tasks: true }
    });
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
}
