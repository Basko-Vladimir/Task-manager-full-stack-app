import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { Priority } from '@prisma/client';
import { Transform } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  @IsEnum(Priority)
  @Transform(({ value }) => String(value).toLowerCase())
  priority: Priority;
}
