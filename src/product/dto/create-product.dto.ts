import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Manufacturer } from '../entities/product.entity';

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

  @IsNumber()
  @Min(0)
  @Max(20)
  @IsInt()
  @IsOptional()
  discount: number;

  @IsOptional()
  @IsEnum(Manufacturer)
  manufacturer: Manufacturer;

  @IsString()
  posterUrl: string;

  @IsNotEmpty()
  @IsArray()
  @IsUUID(4, { each: true })
  customerIds: string[];
}
