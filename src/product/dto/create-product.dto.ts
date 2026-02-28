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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  @ApiProperty({
    type: String,
    maxLength: 128,
  })
  title: string;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @Min(1)
  @Max(100)
  @ApiProperty({
    type: Number,
    minimum: 1,
    maximum: 100,
  })
  price: number;

  @Optional()
  @ApiPropertyOptional()
  isActive: boolean;

  @IsNumber()
  @Min(0)
  @Max(20)
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  discount: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  posterUrl: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  @ApiPropertyOptional({
    type: [Number],
  })
  customerIds: number[];
}
