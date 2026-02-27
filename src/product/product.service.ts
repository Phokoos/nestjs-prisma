import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { In, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { CustomerEntity } from '../customer/entities/customer.entity';
import { ProductPosterEntity } from './dto/poster.entity';

@Injectable()
export class ProductService {
  public constructor(
    @InjectRepository(ProductEntity)
    private readonly movieRepo: Repository<ProductEntity>,
    @InjectRepository(ProductPosterEntity)
    private readonly productPosterRepo: Repository<ProductPosterEntity>,
    @InjectRepository(CustomerEntity)
    private readonly customerRepo: Repository<CustomerEntity>,
  ) {}

  public async findAll(): Promise<ProductEntity[]> {
    return await this.movieRepo.find({
      order: {
        createdAt: 'DESC',
      },
      relations: ['customers', 'poster'],
    });
  }

  public async findById(id: string): Promise<ProductEntity> {
    const product = await this.movieRepo.findOne({
      where: {
        id,
      },
      relations: ['customers', 'poster'],
    });

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  public async create(dto: CreateProductDto): Promise<ProductEntity> {
    const { title, price, manufacturer, discount, customerIds, posterUrl } =
      dto;

    const customers = await this.customerRepo.find({
      where: {
        id: In(customerIds),
      },
    });

    if (!customers || !customers.length)
      throw new NotFoundException('Customer not found');

    let poster: ProductPosterEntity | null = null;

    if (posterUrl) {
      poster = this.productPosterRepo.create({
        url: posterUrl,
      });
      await this.productPosterRepo.save(poster);
    }

    const product = this.movieRepo.create({
      title,
      price,
      poster,
      manufacturer,
      discount,
      customers,
    });

    return await this.movieRepo.save(product);
  }

  public async update(
    id: string,
    dto: CreateProductDto,
  ): Promise<ProductEntity> {
    const product = await this.findById(id);
    return await this.movieRepo.save({ ...product, ...dto });
  }

  public async delete(id: string): Promise<object> {
    const product = await this.findById(id);
    await this.movieRepo.remove(product);
    return {
      status: true,
    };
  }
}
