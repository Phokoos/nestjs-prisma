import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { ProductService } from '../product/product.service';
import { ProductEntity } from '../product/entities/product.entity';
import { CustomerEntity } from '../customer/entities/customer.entity';
import { ProductPosterEntity } from '../product/dto/poster.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReviewEntity,
      ProductEntity,
      CustomerEntity,
      ProductPosterEntity,
    ]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService, ProductService],
})
export class ReviewModule {}
