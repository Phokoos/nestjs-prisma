import { IsNotEmpty, IsNumber, IsUUID, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  text: string;

  @IsNumber()
  @Min(1)
  @Max(10)
  rating: number;

  @IsNumber()
  @IsNotEmpty()
  productId: number;
}
