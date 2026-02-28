import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from '../../generated/prisma/client';
import { ProductService } from '../product/product.service';

@Injectable()
export class ReviewService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly productService: ProductService,
  ) {}

  public async create(dto: CreateReviewDto): Promise<Review> {
    const { text, rating, productId } = dto;
    await this.productService.findById(productId);

    return this.prismaService.review.create({
      data: {
        text,
        rating,
        product: {
          connect: {
            id: productId,
          },
        },
      },
    });
  }
}
