import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '../../generated/prisma/client';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findAll(): Promise<Product[]> {
    return this.prismaService.product.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        customers: true,
        reviews: true,
      },
    });
  }

  public async findById(id: number, isAll: boolean = false): Promise<Product> {
    const product = await this.prismaService.product.findFirst({
      where: {
        id,
      },
      include: {
        customers: true,
        poster: true,
        reviews: true,
      },
    });

    if (!product || (!product.isActive && !isAll))
      throw new NotFoundException('Product not found');

    return product;
  }

  public async create(dto: CreateProductDto): Promise<Product> {
    const { title, price, discount, customerIds, posterUrl } = dto;

    const customers = await this.prismaService.customer.findMany({
      where: {
        id: {
          in: customerIds,
        },
      },
    });

    if (!customers.length) throw new NotFoundException('Customer not found');

    return this.prismaService.product.create({
      data: {
        title,
        price,
        discount,
        ...(posterUrl && {
          poster: {
            create: {
              url: posterUrl,
            },
          },
        }),
        customers: {
          connect: customers.map((customer) => ({ id: customer.id })),
        },
      },
    });
  }

  public async update(id: number, dto: CreateProductDto): Promise<Product> {
    const product = await this.findById(id, true);

    return this.prismaService.product.update({
      where: { id: product.id },
      data: {
        ...dto,
      },
    });
  }

  public async delete(id: number): Promise<object> {
    const product = await this.findById(id, true);
    await this.prismaService.product.delete({
      where: {
        id: product.id,
      },
    });

    return {
      status: 'success',
      message: 'product deleted',
    };
  }
}
