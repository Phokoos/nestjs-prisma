import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { ProductService } from '../product/product.service';

@Injectable()
export class ReviewService {
  public constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepo: Repository<ReviewEntity>,
    private readonly productService: ProductService,
  ) {}

  public async create(dto: CreateReviewDto): Promise<ReviewEntity> {
    const { text, rating, productId } = dto;
    await this.productService.findById(productId);

    const review = this.reviewRepo.create({
      text,
      rating,
      productId,
    });

    return await this.reviewRepo.save(review);
  }
}
