import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateTimerRoundDto {
  @IsOptional()
  @IsBoolean()
    isCompleted?: boolean;

  @IsNumber()
    currentTimeInSeconds: number;
}
