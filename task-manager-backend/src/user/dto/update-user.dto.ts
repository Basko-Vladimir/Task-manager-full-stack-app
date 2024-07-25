import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
    email?: string;

  @IsOptional()
  @MinLength(6, { message: 'Password should beat least 6 characters' })
  @IsString()
    password?: string;

  @IsOptional()
  @IsString()
    name?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
    workInterval?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
    breakInterval?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
    intervalsCount?: number;
}
