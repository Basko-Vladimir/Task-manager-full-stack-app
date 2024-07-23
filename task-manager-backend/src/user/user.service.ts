import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUserById(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      include: { tasks: true }
    });
  }

  async getUserByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email }
    });
  }
}
