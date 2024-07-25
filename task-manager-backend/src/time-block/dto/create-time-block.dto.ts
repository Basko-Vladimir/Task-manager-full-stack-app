import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTimeBlockDto {
  @IsString()
    name: string;

  @IsNumber()
    duration: number;

  @IsOptional()
  @IsString()
    color?: string;

  @IsOptional()
  @IsNumber()
    order?: number;
}
