import { ApiProperty } from '@nestjs/swagger';

export class ProductResponse {
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @ApiProperty({ type: String, example: 'Orange' })
  title: string;

  @ApiProperty({ type: Number, example: 2.26 })
  price: number;

  @ApiProperty({ type: Boolean, example: true })
  isActive: boolean;

  @ApiProperty({ type: Number, example: 5, nullable: true })
  discount: number | null;

  @ApiProperty({ type: Number, nullable: true })
  poster: number | null;

  @ApiProperty({ type: [Number] })
  customers: number[];

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;
}
