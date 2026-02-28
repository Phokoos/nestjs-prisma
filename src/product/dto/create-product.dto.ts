import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Optional } from '@nestjs/common';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  title: string;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @Min(1)
  @Max(100)
  price: number;

  @Optional()
  isActive: boolean;

  @IsNumber()
  @Min(0)
  @Max(20)
  @IsInt()
  @IsOptional()
  discount: number;

  @IsString()
  @IsOptional()
  posterUrl: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  customerIds: number[];
}
